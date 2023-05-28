
/**
 * @param {number} num
 * @return {number}
 */
var largestInteger = function (num) {
    //const {MinPriorityQueue} = require('@datastructures-js/priority-queue');
    const minHeapOddValues = new MinPriorityQueue({compare: (x, y) => x - y});
    const minHeapEvenValues = new MinPriorityQueue({compare: (x, y) => x - y});
    fillPriorityQueues(num, minHeapOddValues, minHeapEvenValues);

    return findLargestInteger(num, minHeapOddValues, minHeapEvenValues);
};

/**
 * @param {number} num
 * @param {MinPriorityQueue<number>} minHeapOddValues 
 * @param {MinPriorityQueue<number>} minHeapEvenValues 
 * @return {void}
 */
function fillPriorityQueues(num, minHeapOddValues, minHeapEvenValues) {
    while (num > 0) {
        if (num % 2 === 0) {
            minHeapEvenValues.enqueue(num % 10);
        } else {
            minHeapOddValues.enqueue(num % 10);
        }
        num = Math.floor(num / 10);
    }
}

/**
 * @param {number} num
 * @param {MinPriorityQueue<number>} minHeapOddValues 
 * @param {MinPriorityQueue<number>} minHeapEvenValues 
 * @return {number}
 */
function findLargestInteger(num, minHeapOddValues, minHeapEvenValues) {
    let largestInteger = 0;
    let placeOfDigit = 1;
    while (num > 0) {
        if (isEven(num % 10)) {
            largestInteger = largestInteger + placeOfDigit * minHeapEvenValues.dequeue();
        } else {
            largestInteger = largestInteger + placeOfDigit * minHeapOddValues.dequeue();
        }
        num = Math.floor(num / 10);
        placeOfDigit *= 10;
    }
    return largestInteger;
}

/**
 * @param {number} num
 * @return {number}
 */
function isEven(num) {
    return num % 2 === 0;
}
