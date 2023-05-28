
import java.util.PriorityQueue;

public class Solution {

    public int largestInteger(int num) {
        PriorityQueue<Integer> minHeapOddValues = new PriorityQueue<>();
        PriorityQueue<Integer> minHeapEvenValues = new PriorityQueue<>();
        fillPriorityQueues(num, minHeapOddValues, minHeapEvenValues);

        return findLargestInteger(num, minHeapOddValues, minHeapEvenValues);
    }

    private void fillPriorityQueues(int num, PriorityQueue<Integer> minHeapOddValues, PriorityQueue<Integer> minHeapEvenValues) {
        while (num > 0) {
            if (num % 2 == 0) {
                minHeapEvenValues.add(num % 10);
            } else {
                minHeapOddValues.add(num % 10);
            }
            num /= 10;
        }
    }

    private int findLargestInteger(int num, PriorityQueue<Integer> minHeapOddValues, PriorityQueue<Integer> minHeapEvenValues) {
        int largestInteger = 0;
        int placeOfDigit = 1;
        while (num > 0) {
            if (isEven(num % 10)) {
                largestInteger = largestInteger + placeOfDigit * minHeapEvenValues.poll();
            } else {
                largestInteger = largestInteger + placeOfDigit * minHeapOddValues.poll();
            }
            num /= 10;
            placeOfDigit *= 10;
        }
        return largestInteger;
    }

    private boolean isEven(int num) {
        return num % 2 == 0;
    }
}
