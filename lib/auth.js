import { jwtVerify } from 'jose';

export async function getToken(req) {

  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    throw new Error('Token missing');
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
