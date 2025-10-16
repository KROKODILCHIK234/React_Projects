// Простой тест API
const { getAllPlayers, getAllTeams, getLeagues } = require('./src/services/footballApi.ts');

async function testAPI() {
  console.log('🧪 Тестируем API...');
  
  try {
    console.log('1. Тестируем getLeagues...');
    const leagues = await getLeagues();
    console.log('✅ Лиги:', leagues.length);
    
    console.log('2. Тестируем getAllTeams...');
    const teams = await getAllTeams();
    console.log('✅ Команды:', teams.length);
    
    console.log('3. Тестируем getAllPlayers...');
    const players = await getAllPlayers();
    console.log('✅ Игроки:', players.length);
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

testAPI();
