import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberSuffix'
})
export class NumberSuffixPipe implements PipeTransform {

    transform(number: number, args?: any): any {
        if (isNaN(number)) return null; // will only work value is a number
        if (number === null) return 0;
        if (number === 0) return 0;
        let abs = Math.abs(number);
        const rounder = Math.pow(10, 1);
        const isNegative = number < 0; // will also work for Negetive numbers
        let key = '';

        const powers = [
            { key: 'q', value: Math.pow(10, 15) },
            { key: 't', value: Math.pow(10, 12) },
            { key: 'b', value: Math.pow(10, 9) },
            { key: 'm', value: Math.pow(10, 6) },
            { key: 'k', value: 1000 }
        ];

        for (let i = 0; i < powers.length; i++) {
            let reduced = abs / powers[i].value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }
        return (isNegative ? '-' : '') + abs + key;
    }

}
