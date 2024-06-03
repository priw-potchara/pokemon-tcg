import { GetCardBySearchReq } from "../../models";
import HTTPCore from "../http.core";

class PokemonTCGHttpService extends HTTPCore {
    constructor() {
        super({})
    }
    getEnv() {
        return 'https://api.pokemontcg.io/v2';
    }
    getToken() {
        return '';
    }
    //==============================
    getCardBySearch(param: GetCardBySearchReq) {
        let url = this.getEnv();
        let q = "";
        let listQ: string[] = [];
        if (param.name || param.setId || param.rarity || param.type) {
            q = "q="
            if (param.name) listQ.push(`name:"*${param.name.trim()}*"`);
            if (param.setId) listQ.push(`set.id:"${param.setId}"`);
            if (param.rarity) listQ.push(`rarity:"${param.rarity}"`);
            if (param.type) listQ.push(`types:"${param.type}"`);
            q = q + listQ.join(" ") + "&&";
        }
        let path = `/cards?${q}${param.page ? "page=" + param.page + "&&" : ""
            }${param.pageSize ? "pageSize=" + param.pageSize : ""}`
        let fullUrl = url + path;
        return this.get(fullUrl);
    }
    getTypes() {
        let url = this.getEnv();
        let path = `/types`
        let fullUrl = url + path;
        return this.get(fullUrl);
    }
    getRarities() {
        let url = this.getEnv();
        let path = `/rarities`
        let fullUrl = url + path;
        return this.get(fullUrl);
    }
    getSets() {
        let url = this.getEnv();
        let path = `/sets`
        let fullUrl = url + path;
        return this.get(fullUrl);
    }
}

export { PokemonTCGHttpService };
