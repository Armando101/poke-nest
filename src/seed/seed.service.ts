import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/adapters/fetch.dapter';
import { ConstantService } from 'src/common/constants/constant.service';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly fetchAdapter: FetchAdapter,
    private readonly constantService: ConstantService,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.fetchAdapter.get<PokeResponse>(
      this.constantService.seedUrl,
    );
    const pokemonList = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = Number(segments[segments.length - 2]);
      return { name, no };
    });

    await this.pokemonModel.insertMany(pokemonList);

    return 'Seed executed';
  }
}
