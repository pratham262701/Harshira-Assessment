function convertToDecimal(value, base) {
  return BigInt(parseInt(value, parseInt(base)));  // For bases <= 16, parseInt works fine
  // For bigger bases, custom conversion needed
}

function parseRoot(root) {
  let base = parseInt(root.base);
  let value = root.value.toLowerCase();
  // Convert value string in base to decimal bigint
  const digits = "0123456789abcdef";
  let result = BigInt(0);
  for (let ch of value) {
    let digit = BigInt(digits.indexOf(ch));
    result = result * BigInt(base) + digit;
  }
  return result;
}

function gaussianElimination(matrix, vector) {
  // Matrix is array of arrays of BigInt, vector is array of BigInt
  // We'll convert BigInt to Number for solving (assuming inputs fit in Number)
  // Otherwise, use a BigInt linear algebra library (complex)
  let n = matrix.length;
  let M = matrix.map(row => row.map(x => Number(x)));
  let V = vector.map(x => Number(x));

  for (let i = 0; i < n; i++) {
    // Partial pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];
    [V[i], V[maxRow]] = [V[maxRow], V[i]];

    // Eliminate below
    for (let k = i + 1; k < n; k++) {
      let c = M[k][i] / M[i][i];
      for (let j = i; j < n; j++) {
        M[k][j] -= c * M[i][j];
      }
      V[k] -= c * V[i];
    }
  }

  // Back substitution
  let x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = V[i];
    for (let j = i + 1; j < n; j++) {
      sum -= M[i][j] * x[j];
    }
    x[i] = sum / M[i][i];
  }
  return x;
}

function solvePolynomialRoots(data) {
  let n = data.keys.n;
  let k = data.keys.k;
  let m = k - 1;

  // Extract roots, convert to decimal
  let roots = [];
  for (let i = 1; i <= n; i++) {
    let root = data[i.toString()];
    if (root) {
      roots.push(parseRoot(root));
    }
  }

  // Use first k roots to form system
  let matrix = [];
  let vector = [];
  for (let i = 0; i < k; i++) {
    let row = [];
    let r = roots[i];
    for (let j = 0; j < m; j++) {
      row.push(r ** BigInt(j));
    }
    matrix.push(row);
    vector.push(-(r ** BigInt(m)));
  }

  let coeffs = gaussianElimination(matrix, vector);
  coeffs.push(1); // a_m = 1

  return coeffs;
}
