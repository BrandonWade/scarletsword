import { Text } from 'react-native';
import { Acorn } from '../components/common/Symbols';
import { Black } from '../components/common/Symbols';
import { BlackGreen } from '../components/common/Symbols';
import { BlackGreenPhyrexia } from '../components/common/Symbols';
import { BlackPhyrexia } from '../components/common/Symbols';
import { BlackRed } from '../components/common/Symbols';
import { BlackRedPhyrexia } from '../components/common/Symbols';
import { Blue } from '../components/common/Symbols';
import { BlueBlack } from '../components/common/Symbols';
import { BlueBlackPhyrexia } from '../components/common/Symbols';
import { BluePhyrexia } from '../components/common/Symbols';
import { BlueRed } from '../components/common/Symbols';
import { BlueRedPhyrexia } from '../components/common/Symbols';
import { Chaos } from '../components/common/Symbols';
import { Colorless } from '../components/common/Symbols';
import { ColorlessBlack } from '../components/common/Symbols';
import { ColorlessBlue } from '../components/common/Symbols';
import { ColorlessGreen } from '../components/common/Symbols';
import { ColorlessPhyrexia } from '../components/common/Symbols';
import { ColorlessRed } from '../components/common/Symbols';
import { ColorlessWhite } from '../components/common/Symbols';
import { Drop } from '../components/common/Symbols';
import { Eight } from '../components/common/Symbols';
import { Eighteen } from '../components/common/Symbols';
import { Eleven } from '../components/common/Symbols';
import { Energy } from '../components/common/Symbols';
import { Fifteen } from '../components/common/Symbols';
import { Five } from '../components/common/Symbols';
import { Four } from '../components/common/Symbols';
import { Fourteen } from '../components/common/Symbols';
import { Green } from '../components/common/Symbols';
import { GreenBlue } from '../components/common/Symbols';
import { GreenBluePhyrexia } from '../components/common/Symbols';
import { GreenPhyrexia } from '../components/common/Symbols';
import { GreenWhite } from '../components/common/Symbols';
import { GreenWhitePhyrexia } from '../components/common/Symbols';
import { Half } from '../components/common/Symbols';
import { HalfRed } from '../components/common/Symbols';
import { HalfWhite } from '../components/common/Symbols';
import { Infinity } from '../components/common/Symbols';
import { Legendary } from '../components/common/Symbols';
import { Nine } from '../components/common/Symbols';
import { Nineteen } from '../components/common/Symbols';
import { One } from '../components/common/Symbols';
import { OneHundred } from '../components/common/Symbols';
import { OneMillion } from '../components/common/Symbols';
import { Pawprint } from '../components/common/Symbols';
import { Phyrexia } from '../components/common/Symbols';
import { Planeswalker } from '../components/common/Symbols';
import { Red } from '../components/common/Symbols';
import { RedGreen } from '../components/common/Symbols';
import { RedGreenPhyrexia } from '../components/common/Symbols';
import { RedPhyrexia } from '../components/common/Symbols';
import { RedWhite } from '../components/common/Symbols';
import { RedWhitePhyrexia } from '../components/common/Symbols';
import { Seven } from '../components/common/Symbols';
import { Seventeen } from '../components/common/Symbols';
import { Six } from '../components/common/Symbols';
import { Sixteen } from '../components/common/Symbols';
import { Snow } from '../components/common/Symbols';
import { Tap } from '../components/common/Symbols';
import { Ten } from '../components/common/Symbols';
import { Thirteen } from '../components/common/Symbols';
import { Three } from '../components/common/Symbols';
import { Ticket } from '../components/common/Symbols';
import { Twelve } from '../components/common/Symbols';
import { Twenty } from '../components/common/Symbols';
import { Two } from '../components/common/Symbols';
import { TwoBlack } from '../components/common/Symbols';
import { TwoBlue } from '../components/common/Symbols';
import { TwoGreen } from '../components/common/Symbols';
import { TwoRed } from '../components/common/Symbols';
import { TwoWhite } from '../components/common/Symbols';
import { Untap } from '../components/common/Symbols';
import { White } from '../components/common/Symbols';
import { WhiteBlack } from '../components/common/Symbols';
import { WhiteBlackPhyrexia } from '../components/common/Symbols';
import { WhiteBlue } from '../components/common/Symbols';
import { WhiteBluePhyrexia } from '../components/common/Symbols';
import { WhitePhyrexia } from '../components/common/Symbols';
import { X } from '../components/common/Symbols';
import { Y } from '../components/common/Symbols';
import { Z } from '../components/common/Symbols';
import { Zero } from '../components/common/Symbols';

export const symbolMap = {
  '{T}': Tap,
  '{Q}': Untap,
  '{E}': Energy,
  '{P}': Pawprint,
  '{PW}': Planeswalker,
  '{CHAOS}': Chaos,
  '{A}': Acorn,
  '{TK}': Ticket,
  '{X}': X,
  '{Y}': Y,
  '{Z}': Z,
  '{0}': Zero,
  '{½}': Half,
  '{1}': One,
  '{2}': Two,
  '{3}': Three,
  '{4}': Four,
  '{5}': Five,
  '{6}': Six,
  '{7}': Seven,
  '{8}': Eight,
  '{9}': Nine,
  '{10}': Ten,
  '{11}': Eleven,
  '{12}': Twelve,
  '{13}': Thirteen,
  '{14}': Fourteen,
  '{15}': Fifteen,
  '{16}': Sixteen,
  '{17}': Seventeen,
  '{18}': Eighteen,
  '{19}': Nineteen,
  '{20}': Twenty,
  '{100}': OneHundred,
  '{1000000}': OneMillion,
  '{∞}': Infinity,
  '{W/U}': WhiteBlue,
  '{W/B}': WhiteBlack,
  '{B/R}': BlackRed,
  '{B/G}': BlackGreen,
  '{U/B}': BlueBlack,
  '{U/R}': BlueRed,
  '{R/G}': RedGreen,
  '{R/W}': RedWhite,
  '{G/W}': GreenWhite,
  '{G/U}': GreenBlue,
  '{B/G/P}': BlackGreenPhyrexia,
  '{B/R/P}': BlackRedPhyrexia,
  '{G/U/P}': GreenBluePhyrexia,
  '{G/W/P}': GreenWhitePhyrexia,
  '{R/G/P}': RedGreenPhyrexia,
  '{R/W/P}': RedWhitePhyrexia,
  '{U/B/P}': BlueBlackPhyrexia,
  '{U/R/P}': BlueRedPhyrexia,
  '{W/B/P}': WhiteBlackPhyrexia,
  '{W/U/P}': WhiteBluePhyrexia,
  '{C/W}': ColorlessWhite,
  '{C/U}': ColorlessBlue,
  '{C/B}': ColorlessBlack,
  '{C/R}': ColorlessRed,
  '{C/G}': ColorlessGreen,
  '{2/W}': TwoWhite,
  '{2/U}': TwoBlue,
  '{2/B}': TwoBlack,
  '{2/R}': TwoRed,
  '{2/G}': TwoGreen,
  '{H}': Phyrexia,
  '{W/P}': WhitePhyrexia,
  '{U/P}': BluePhyrexia,
  '{B/P}': BlackPhyrexia,
  '{R/P}': RedPhyrexia,
  '{G/P}': GreenPhyrexia,
  '{C/P}': ColorlessPhyrexia,
  '{HW}': HalfWhite,
  '{HR}': HalfRed,
  '{W}': White,
  '{U}': Blue,
  '{B}': Black,
  '{R}': Red,
  '{G}': Green,
  '{C}': Colorless,
  '{S}': Snow,
  '{L}': Legendary,
  '{D}': Drop,
};

export function parseSymbolText(text: string) {
  return text
    .split(/(\{(?:\D|[A-Z0-9]+|[A-Z0-9]+\/[A-Z0-9]+)\})/gm)
    .filter((symbol) => symbol.length);
}

export function getSymbols(text: string, symbolProps = {}) {
  const symbols = parseSymbolText(text);

  return symbols.map((symbol: string, i: number) => {
    const Symbol = symbolMap[symbol];

    if (Symbol !== undefined) {
      return <Symbol key={i} {...symbolProps} />;
    }

    return <Text key={i}>{symbol}</Text>;
  });
}
