/*
 * The MIT License
 *
 * Copyright (c) 2009 Olle Törnström studiomediatech.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * CREDIT: Initially implemented by Diogo Kollross and made publicly available
 *         on the website http://www.geocities.com/diogok_br/lz77.
 */

/**
 * This class provides simple LZ77 compression and decompression.
 *
 * @author Olle Törnström olle[at]studiomediatech[dot]com
 * @created 2009-02-18
 */

/* eslint-disable */

export class LZ77 {
    private settings: any
    private referencePrefix: string = '`';
    private referenceIntBase: any;
    private referenceIntFloorCode: any;
    private referenceIntCeilCode: any;
    private maxStringDistance: any;
    private minStringLength: any;
    private maxStringLength: any;
    private defaultWindowLength: any;
    private maxWindowLength: any;

    constructor(settings?: any) {
        settings = settings || {};
        this.referenceIntBase = this.settings?.referenceIntBase || 96;
        this.referenceIntFloorCode = ' '.charCodeAt(0);
        this.referenceIntCeilCode = this.referenceIntFloorCode + this.referenceIntBase - 1;
        this.maxStringDistance = Math.pow(this.referenceIntBase, 2) - 1;
        this.minStringLength = this.settings?.minStringLength || 5;
        this.maxStringLength = Math.pow(this.referenceIntBase, 1) - 1 + this.minStringLength;
        this.defaultWindowLength = this.settings?.defaultWindowLength || 144;
        this.maxWindowLength = this.maxStringDistance + this.minStringLength;
    }

    private encodeReferenceInt(value: any, width: any) {
        if (value >= 0 && value < Math.pow(this.referenceIntBase, width) - 1) {
            let encoded = '';
            while (value > 0) {
                encoded =
                    String.fromCharCode(
                        (value % this.referenceIntBase) + this.referenceIntFloorCode,
                    ) + encoded;
                value = Math.floor(value / this.referenceIntBase);
            }
            let missingLength = width - encoded.length;
            for (let i = 0; i < missingLength; i++) {
                encoded = String.fromCharCode(this.referenceIntFloorCode) + encoded;
            }
            return encoded;
        } else {
            throw new Error('Reference int out of range: ' + value + ' (width = ' + width + ')');
        }
    };

    private encodeReferenceLength(length: any) {
        return this.encodeReferenceInt(length - this.minStringLength, 1);
    };

    private decodeReferenceInt(data: any, width: any) {
        let value = 0;
        for (let i = 0; i < width; i++) {
            value *= this.referenceIntBase;
            let charCode = data.charCodeAt(i);
            if (
                charCode >= this.referenceIntFloorCode &&
                charCode <= this.referenceIntCeilCode
            ) {
                value += charCode - this.referenceIntFloorCode;
            } else {
                throw new Error('Invalid char code in reference int: ' + charCode);
            }
        }
        return value;
    };

    private decodeReferenceLength(data: any) {
        return this.decodeReferenceInt(data, 1) + this.minStringLength;
    };

    // PUBLIC

    /**
     * Compress data using the LZ77 algorithm.
     *
     * @param data
     * @param windowLength
     */
    public compress(data: any, windowLength?: any) {
        windowLength = windowLength || this.defaultWindowLength;
        if (windowLength > this.maxWindowLength) {
            throw new Error('Window length too large');
        }
        let compressed = '';
        let pos = 0;
        let lastPos = data.length - this.minStringLength;
        while (pos < lastPos) {
            let searchStart = Math.max(pos - windowLength, 0);
            let matchLength = this.minStringLength;
            let foundMatch = false;
            let bestMatch = { distance: this.maxStringDistance, length: 0 };
            let newCompressed = null;
            while (searchStart + matchLength < pos) {
                let isValidMatch =
                    data.substr(searchStart, matchLength) ==
                    data.substr(pos, matchLength) && matchLength < this.maxStringLength;
                if (isValidMatch) {
                    matchLength++;
                    foundMatch = true;
                } else {
                    let realMatchLength = matchLength - 1;
                    if (foundMatch && realMatchLength > bestMatch.length) {
                        bestMatch.distance = pos - searchStart - realMatchLength;
                        bestMatch.length = realMatchLength;
                    }
                    matchLength = this.minStringLength;
                    searchStart++;
                    foundMatch = false;
                }
            }
            if (bestMatch.length) {
                newCompressed =
                    this.referencePrefix +
                    this.encodeReferenceInt(bestMatch.distance, 2) +
                    this.encodeReferenceLength(bestMatch.length);
                pos += bestMatch.length;
            } else {
                if (data.charAt(pos) != this.referencePrefix) {
                    newCompressed = data.charAt(pos);
                } else {
                    newCompressed = this.referencePrefix + this.referencePrefix;
                }
                pos++;
            }
            compressed += newCompressed;
        }
        return compressed + data.slice(pos).replace(/`/g, '``');
    };

    /**
     * Decompresses LZ77 compressed data.
     *
     * @param data
     */
    public decompress(data: any) {
        let decompressed = '';
        let pos = 0;
        while (pos < data.length) {
            let currentChar = data.charAt(pos);
            if (currentChar != this.referencePrefix) {
                decompressed += currentChar;
                pos++;
            } else {
                let nextChar = data.charAt(pos + 1);
                if (nextChar != this.referencePrefix) {
                    let distance = this.decodeReferenceInt(data.substr(pos + 1, 2), 2);
                    let length = this.decodeReferenceLength(data.charAt(pos + 3));
                    decompressed += decompressed.substr(
                        decompressed.length - distance - length,
                        length,
                    );
                    pos += this.minStringLength - 1;
                } else {
                    decompressed += this.referencePrefix;
                    pos += 2;
                }
            }
        }
        return decompressed;
    };
};


