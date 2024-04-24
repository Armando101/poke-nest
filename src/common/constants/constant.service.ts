import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DEFAULT_LIMIT = 20;
export const DEFAULT_SKIP = 0;

@Injectable()
export class ConstantService {
  private _seedUrl: string;
  private _defaultLimit: number;
  private _defaultOffset: number;

  constructor(private readonly configService: ConfigService) {
    this._defaultLimit = this.configService.get<number>('defaultLimit');
    this._defaultOffset = this.configService.get<number>('defaultOffset');
    const seedItems = this.configService.get<number>('seedItems');
    this._seedUrl = `${this.configService.get<string>('seedUrl')}?limit=${seedItems}`;
  }

  get defaultLimit() {
    return this._defaultLimit;
  }

  get defaultOffset() {
    return this._defaultOffset;
  }

  get seedUrl() {
    return this._seedUrl;
  }
}
