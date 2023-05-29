
#include <queue>
using namespace std;

class Solution {
    
    using MinHeap = priority_queue<int, vector<int>, greater<>>;

public:
    int largestInteger(int num) const {
        MinHeap minHeapOddValues;
        MinHeap minHeapEvenValues;
        fillPriorityQueues(num, minHeapOddValues, minHeapEvenValues);

        return findLargestInteger(num, minHeapOddValues, minHeapEvenValues);
    }

private:
    void fillPriorityQueues(int num, MinHeap& minHeapOddValues, MinHeap& minHeapEvenValues) const {
        while (num > 0) {
            if (num % 2 == 0) {
                minHeapEvenValues.push(num % 10);
            } else {
                minHeapOddValues.push(num % 10);
            }
            num /= 10;
        }
    }

    int findLargestInteger(int num, MinHeap& minHeapOddValues, MinHeap& minHeapEvenValues) const {

        // All used values of 'placeOfDigit' are within INT_MAX but it is declared as 'long' to keep the code simple.
        // With some values, after the last interation, 'placeOfDigit' may exceed INT_MAX.
        // Some compilers, such as clang 11, might throw a Runtime Error in this case.
        // The value that exceeds INT_MAX is not used, since it is the last iteration
        // and the computed value is only used during the following interation.
        long placeOfDigit = 1;
        int largestInteger = 0;

        while (num > 0) {
            if (isEven(num % 10)) {
                largestInteger = largestInteger + placeOfDigit * minHeapEvenValues.top();
                minHeapEvenValues.pop();
            } else {
                largestInteger = largestInteger + placeOfDigit * minHeapOddValues.top();
                minHeapOddValues.pop();
            }
            num /= 10;
            placeOfDigit *= 10;
        }
        return largestInteger;
    }

    bool isEven(int num) const {
        return num % 2 == 0;
    }
};
