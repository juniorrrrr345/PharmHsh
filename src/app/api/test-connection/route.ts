import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function GET() {
  try {
    console.log('🔍 Test de connexion MongoDB...');
    
    // Tenter la connexion
    const { db } = await connectToDatabase();
    
    // Tester une requête simple
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({
      success: true,
      message: 'Connexion MongoDB réussie',
      database: db.databaseName,
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}