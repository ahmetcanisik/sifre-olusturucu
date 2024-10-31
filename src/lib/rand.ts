import { v4 as uuidv4 } from "uuid";
import toast from 'react-hot-toast';

interface RAND_GEN_CHOICES {
    lowerChars: boolean,
    upperChars: boolean,
    letters: boolean,
    turkishChars: boolean,
}

const defaultChoices: RAND_GEN_CHOICES = {
    lowerChars: true,
    upperChars: true,
    letters: false,
    turkishChars: false,
}

export class Rand {
    constructor() {
        console.log("Rand initialized!");
    }

    uniq() {
        return uuidv4();
    }

    range(min = 0, max = 10) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    gen(
        len: number = 0,
        choices: RAND_GEN_CHOICES = defaultChoices
    ) {
        const lowerChars: string = "abcdefghijklmnopqrstuvwxyz";
        const upperChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letters: string = "0123456789";
        const turkishLowerChars: string = "çğıöşü";
        const turkishUpperChars: string = "ÇĞİÖŞÜ";

        let chars: string = "";
        let all_false: boolean = true;

        for (const choice of Object.keys(choices)) {
            if (choices[choice as keyof RAND_GEN_CHOICES]) {
                all_false = false;
            }
        }

        if (
            choices.letters === false &&
            choices.lowerChars === false &&
            choices.upperChars === false &&
            choices.turkishChars === true
        ) {
            toast.error("Tek başına türkçe karakterleri seçmişsin. Büyük, küçük harfleri istemiyorsan türkçe karakterlerden bir şifre oluşturamam.");
            return undefined;
        }

        if (
            // eğer herhangi bir seçenek seçilmemiş ise
            all_false === true ||
            
            // büyük küçük harfler seçili değil ama türkçe karakterler seçili ise.
            (
                choices.lowerChars === false &&
                choices.upperChars === false &&
                choices.letters === false &&
                choices.turkishChars
            )
        ) {
            toast.error("Lütfen en az bir karakter tipi seçiniz.");
            return undefined;
        }

        if (choices.lowerChars) {
            chars += lowerChars;
        }
        if (choices.upperChars) {
            chars += upperChars;
        }
        if (choices.letters) {
            chars += letters;
        }
        
        /* Turkish Chars Control */
        if (choices.turkishChars && choices.lowerChars) {
            chars += turkishLowerChars;
        }
        if (choices.turkishChars && choices.upperChars) {
            chars += turkishUpperChars;
        }

        if (len > 0) {
            let rnds = "";
            for (let i = 0; i < len; i++) {
                rnds += chars[this.range(0, chars.length - 1)];
            }
            return rnds;
        }
        return undefined;
    }
}

const rand = new Rand();
export default rand;