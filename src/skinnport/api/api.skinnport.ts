import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { SkinnportItem } from "../entities/skinnport.item";

@Injectable()
export class ApiSkinnport {

  private readonly API_SKINNPORT_HOST = 'https://api.skinport.com'

  async getItems(tradable: boolean) : Promise<SkinnportItem[]> {
    const res = await axios.get(`${this.API_SKINNPORT_HOST}/v1/items?tradable=${tradable}`);
    return res.data
  }

}