import TextLoader from './class';
import { textData } from '../mock/texts';

describe('TextLoader', () => {
  //
  it('should allow us to load text data', () => {
    const loader = new TextLoader(textData, 'EN_en');
  });
  //
  it('should allow us to get a specific text', () => {
    const loader = new TextLoader(textData, 'EN_en');    
    expect(loader.get('T_GAME_INTRO')).toBe(textData['T_GAME_INTRO']['EN_en']);
  });
  //
  it('should allow us to change the locale used', () => {
    const loader = new TextLoader(textData, 'FR_fr');    
    expect(loader.get('T_GAME_INTRO')).toBe(textData['T_GAME_INTRO']['FR_fr']);
    loader.setLocale('EN_en');
    expect(loader.get('T_GAME_INTRO')).toBe(textData['T_GAME_INTRO']['EN_en']);
  })
  //
  it('should return the text id if there is no matching text', () => {
    const loader = new TextLoader(textData, 'FR_fr');
    expect(loader.get('INVALID_ID')).toBe('INVALID_ID'); 
  });
});
