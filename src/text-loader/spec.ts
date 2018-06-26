import TextLoader from './class';
import mockData from './mock';

describe('TextLoader', () => {
  //
  it('should allow us to load text data', () => {
    const loader = new TextLoader(mockData, 'EN_en');
  });
  //
  it('should allow us to get a specific text', () => {
    const loader = new TextLoader(mockData, 'EN_en');    
    expect(loader.get('GAME_INTRO')).toBe(mockData['GAME_INTRO']['EN_en']);
  });
  //
  it('should allow us to change the locale used', () => {
    const loader = new TextLoader(mockData, 'FR_fr');    
    expect(loader.get('GAME_INTRO')).toBe(mockData['GAME_INTRO']['FR_fr']);
    loader.setLocale('EN_en');
    expect(loader.get('GAME_INTRO')).toBe(mockData['GAME_INTRO']['EN_en']);
  })
});
