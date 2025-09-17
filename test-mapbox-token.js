// Test script to verify Mapbox token validity
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwaGFueWFuZSIsImEiOiJjbTdtMHp1OHUwaDhxMmlxdG5za3QzNTNzIn0.naTWJv5M3LuvUvB18-5RSQ';

// Test the token by making a request to Mapbox Styles API
async function testMapboxToken() {
  console.log('Testing Mapbox token validity...');
  console.log('Token:', MAPBOX_TOKEN);
  
  try {
    // Test 1: Check token validity with Mapbox Styles API
    const stylesUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11?access_token=${MAPBOX_TOKEN}`;
    console.log('\nTesting Styles API:', stylesUrl);
    
    const response = await fetch(stylesUrl);
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token is valid! Style data received.');
      console.log('Style name:', data.name);
      console.log('Style owner:', data.owner);
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Token validation failed!');
      console.log('Error response:', errorText);
      return false;
    }
  } catch (error) {
    console.log('❌ Network error occurred:');
    console.log('Error:', error.message);
    
    // Check if it's a CORS issue
    if (error.message.includes('CORS') || error.message.includes('fetch')) {
      console.log('\n🔍 This might be a CORS issue. Testing with alternative method...');
      
      // Test with a different endpoint that might be more permissive
      try {
        const tokenInfoUrl = `https://api.mapbox.com/tokens/v2?access_token=${MAPBOX_TOKEN}`;
        const tokenResponse = await fetch(tokenInfoUrl);
        
        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          console.log('✅ Token info retrieved successfully:');
          console.log('Token scopes:', tokenData.scopes);
          console.log('Token usage:', tokenData.usage);
          return true;
        }
      } catch (altError) {
        console.log('Alternative test also failed:', altError.message);
      }
    }
    
    return false;
  }
}

// Test token permissions and scopes
async function testTokenPermissions() {
  console.log('\n=== Testing Token Permissions ===');
  
  try {
    const tokenInfoUrl = `https://api.mapbox.com/tokens/v2?access_token=${MAPBOX_TOKEN}`;
    const response = await fetch(tokenInfoUrl);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Token scopes:', data.scopes);
      console.log('Token usage this month:', data.usage);
      
      // Check if token has required scopes for styles
      const requiredScopes = ['styles:read', 'fonts:read', 'sprites:read'];
      const hasRequiredScopes = requiredScopes.every(scope => 
        data.scopes && data.scopes.includes(scope)
      );
      
      if (hasRequiredScopes) {
        console.log('✅ Token has required scopes for Styles API');
      } else {
        console.log('⚠️ Token may be missing required scopes');
        console.log('Required scopes:', requiredScopes);
        console.log('Available scopes:', data.scopes);
      }
      
      return true;
    } else {
      console.log('❌ Could not retrieve token information');
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking token permissions:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting Mapbox Token Tests\n');
  
  const isValid = await testMapboxToken();
  
  if (isValid) {
    await testTokenPermissions();
    console.log('\n✅ All tests completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. If tests pass but map still fails, check for CORS issues in browser');
    console.log('2. Verify the CoverageMap component is using the token correctly');
    console.log('3. Check browser network tab for specific error details');
  } else {
    console.log('\n❌ Token validation failed!');
    console.log('\n📋 Recommended actions:');
    console.log('1. Generate a new Mapbox access token at https://account.mapbox.com/access-tokens/');
    console.log('2. Ensure the token has the required scopes: styles:read, fonts:read, sprites:read');
    console.log('3. Update the VITE_MAPBOX_TOKEN in your .env file');
  }
}

// Run the tests
runTests().catch(console.error);