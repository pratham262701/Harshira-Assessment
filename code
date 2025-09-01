import java.util.*;
import org.json.JSONObject;
import org.json.JSONArray;
import java.math.BigInteger;

public class HashiraPlacements {
    
    public static BigInteger convertToDecimal(String value, int base) {
        if (base == 10) {
            return new BigInteger(value);
        }
        
        BigInteger result = BigInteger.ZERO;
        BigInteger baseBig = BigInteger.valueOf(base);
        BigInteger power = BigInteger.ONE;
        
        
        for (int i = value.length() - 1; i >= 0; i--) {
            char c = value.charAt(i);
            int digitValue;
            
            if (c >= '0' && c <= '9') {
                digitValue = c - '0';
            } else if (c >= 'a' && c <= 'z') {
                digitValue = 10 + (c - 'a');
            } else if (c >= 'A' && c <= 'Z') {
                digitValue = 10 + (c - 'A');
            } else {
                throw new IllegalArgumentException("Invalid character in number: " + c);
            }
            
            if (digitValue >= base) {
                throw new IllegalArgumentException("Digit " + c + " is invalid for base " + base);
            }
            
            BigInteger digitBig = BigInteger.valueOf(digitValue);
            result = result.add(digitBig.multiply(power));
            power = power.multiply(baseBig);
        }
        
        return result;
    }
    
    public static List<BigInteger> solvePolynomial(List<BigInteger> roots) {
        int n = roots.size();
        List<BigInteger> coefficients = new ArrayList<>();
        
        
        coefficients.add(BigInteger.ONE);
        
        
        for (int i = 0; i < n; i++) {
            BigInteger root = roots.get(i);
            List<BigInteger> newCoeffs = new ArrayList<>();
            
            
            for (int j = 0; j <= coefficients.size(); j++) {
                BigInteger term;
                if (j == 0) {
                    term = coefficients.get(0).multiply(root.negate());
                } else if (j == coefficients.size()) {
                    term = coefficients.get(j - 1);
                } else {
                    term = coefficients.get(j).multiply(root.negate())
                            .add(coefficients.get(j - 1));
                }
                newCoeffs.add(term);
            }
            
            coefficients = newCoeffs;
        }
        
        return coefficients;
    }
    
    public static void main(String[] args) {
        String jsonInput = "{\"keys\":{\"n\":4,\"k\":3},\"1\":{\"base\":\"10\",\"value\":\"4\"},\"2\":{\"base\":\"2\",\"value\":\"111\"},\"3\":{\"base\":\"10\",\"value\":\"12\"},\"6\":{\"base\":\"4\",\"value\":\"213\"}}";
        
        try {
            JSONObject json = new JSONObject(jsonInput);
            JSONObject keys = json.getJSONObject("keys");
            int n = keys.getInt("n");
            int k = keys.getInt("k");
            
            List<BigInteger> roots = new ArrayList<>();
            
            
            for (int i = 1; i <= n; i++) {
                if (json.has(String.valueOf(i))) {
                    JSONObject rootObj = json.getJSONObject(String.valueOf(i));
                    int base = rootObj.getInt("base");
                    String value = rootObj.getString("value");
                    
                    BigInteger decimalValue = convertToDecimal(value, base);
                    roots.add(decimalValue);
                }
            }
            
            
            if (roots.size() < k) {
                System.out.println("Error: Not enough roots provided. Need at least " + k + " roots.");
                return;
            }
            
            
            List<BigInteger> usedRoots = roots.subList(0, k);
            List<BigInteger> coefficients = solvePolynomial(usedRoots);
            
            
            System.out.println("Polynomial coefficients (from highest to lowest degree):");
            for (int i = 0; i < coefficients.size(); i++) {
                System.out.println("x^" + (coefficients.size() - i - 1) + ": " + coefficients.get(i));
            }
            
        } catch (Exception e) {
            System.out.println("Error processing JSON: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
