
using System;
using System.Collections.Generic;

public class Solution
{
    public int LargestInteger(int num)
    {
        PriorityQueue<int, int> minHeapOddValues = new PriorityQueue<int, int>();
        PriorityQueue<int, int> minHeapEvenValues = new PriorityQueue<int, int>();
        fillPriorityQueues(num, minHeapOddValues, minHeapEvenValues);

        return findLargestInteger(num, minHeapOddValues, minHeapEvenValues);
    }

    private void fillPriorityQueues(int num, PriorityQueue<int, int> minHeapOddValues, PriorityQueue<int, int> minHeapEvenValues)
    {
        while (num > 0)
        {
            if (num % 2 == 0)
            {
                minHeapEvenValues.Enqueue(num % 10, num % 10);
            }
            else
            {
                minHeapOddValues.Enqueue(num % 10, num % 10);
            }
            num /= 10;
        }
    }

    private int findLargestInteger(int num, PriorityQueue<int, int> minHeapOddValues, PriorityQueue<int, int> minHeapEvenValues)
    {
        int largestInteger = 0;
        int placeOfDigit = 1;
        while (num > 0)
        {
            if (isEven(num % 10))
            {
                largestInteger = largestInteger + placeOfDigit * minHeapEvenValues.Dequeue();
            }
            else
            {
                largestInteger = largestInteger + placeOfDigit * minHeapOddValues.Dequeue();
            }
            num /= 10;
            placeOfDigit *= 10;
        }
        return largestInteger;
    }

    private bool isEven(int num)
    {
        return num % 2 == 0;
    }
}
