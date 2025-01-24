import { ColorSymbol } from '../../../utils/enums';

export type SymbolBoxProps = {
  symbol: ColorSymbol;
  isActive: boolean;
  onPressSymbol: (symbol: ColorSymbol) => void;
};
