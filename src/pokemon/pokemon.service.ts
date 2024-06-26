import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConstantService } from '../common/constants/constant.service';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly constantService: ConstantService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {
      limit = this.constantService.defaultLimit,
      offset = this.constantService.defaultOffset,
    } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 }) // Order by "no" ascending
      .select('-__v'); // Omit __v column
  }

  async findOne(query: string) {
    let pokemon: Pokemon;

    // isNumber
    if (!isNaN(+query)) {
      pokemon = await this.pokemonModel.findOne({ no: query });
    }

    // find by object ID
    if (!pokemon && isValidObjectId(query)) {
      pokemon = await this.pokemonModel.findById(query);
    }

    // find by name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: query.toLocaleLowerCase().trim(),
      });
    }

    // resource not found
    // Controlled Exception
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with query ${query} not found`);
    }

    return pokemon;
  }

  async update(query: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(query);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
    } catch (error) {
      this.handleExceptions(error);
    }
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(_id: string) {
    // If we want to delete by name or other parameter we can use this commented code
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${_id} not found`);
    }
  }

  // For uncontrolled exceptions
  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
