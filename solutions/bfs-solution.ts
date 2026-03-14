const YES = "YES";
const NO = "NO";

function isFiniteNumbers(...nums: number[]): boolean {
  return nums.every(Number.isFinite);
}

function hasNegativeNumbers(...nums: number[]): boolean {
  return nums.some((num) => num < 0);
}

function canReachTarget(a: number, b: number, target: number): string {
  if (!isFiniteNumbers(a, b, target)) return NO;
  if (hasNegativeNumbers(a, b, target)) return NO;
  if (target < a && target < b) return NO;

  const queue: [number, number][] = [[a, b]];
  const visitedStates = new Set<string>();
  let queueIndex = 0;
  let isFirstIteration = true;

  while (queueIndex < queue.length) {
    const state = queue[queueIndex++];
    if (!state) continue;
    const [curA, curB] = state;

    if (isFirstIteration) {
      if (curA === target || curB === target) return YES;
      isFirstIteration = false;
    } else {
      const currentMax = Math.max(curA, curB);
      if (currentMax === target) return YES;
    }

    if (curA > target || curB > target) continue;

    const key = `${curA},${curB}`;
    if (visitedStates.has(key)) continue;
    visitedStates.add(key);

    const sum = curA + curB;

    if (sum <= target) {
      if (sum === target) return YES;
      queue.push([curA, sum]);
      queue.push([sum, curB]);
    }
  }

  return NO;
}

function checkNumbers() {
  const numbers = [
    { a: 1, b: 2, target: 3 },
    { a: 2, b: 4, target: 7 },
    { a: 2, b: 3, target: 5 },
    { a: 1, b: 1, target: 8 },
    { a: 5, b: 7, target: 12 },
    { a: 3, b: 6, target: 20 },
    { a: 10, b: 1, target: 2 },
    { a: 0, b: 0, target: 0 },
    { a: 0, b: 5, target: 10 },
  ];
  
  numbers.forEach(({ a, b, target }, idx) => {
    const result = canReachTarget(a, b, target);
    console.log(`Input #${idx + 1}: a=${a}, b=${b}, target=${target} => ${result}`);
  });
}

checkNumbers();