import Image from "next/image";
import React from "react";

interface TradeCardProps {
  isInput: boolean;
  setSolAmount: (amount: string) => void;
  inputValue: string;
  imgStr: string;
  tokenName: string;
  tokenBalance: string;
  tokenNameCheckout: string;
}
const TradeCard = ({
  setSolAmount,
  isInput,
  inputValue,
  imgStr,
  tokenName,
  tokenBalance,
  tokenNameCheckout,
}: TradeCardProps) => {
  return (
    <div>
      <div className="bg-[#2A2A2A] rounded-2xl p-5 mb-4">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#282828] to-[#456a2f] flex items-center justify-center mr-3">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image src={imgStr} alt="Logo" width={24} height={24} />
              </div>
            </div>
            <span className="text-xl font-semibold">{tokenName} </span>
          </div>
          <span className="text-xs text-gray-400">{tokenNameCheckout}</span>
        </div>
        <div className="flex justify-between items-end">
          {isInput ? (
            <input
              type="number"
              min="0.01"
              step="0.01"
              defaultValue="1"
              className="text-4xl font-bold bg-transparent w-24 focus:outline-none focus:border-b focus:border-[#A6E264]"
              onChange={(e) => {
                const value = Number.parseFloat(e.target.value);
                if (value < 0.01) {
                  e.target.value = "0.01";
                }
                setSolAmount(e.target.value);
              }}
            />
          ) : (
            <span className="text-4xl font-bold">≈{inputValue}</span>
          )}

          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Balance</div>
            <div className="text-lg">{tokenBalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeCard;
