"use client";
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import { supabase } from '@/lib/supabase/client';
import { useUserStore } from '@/store/user';
import { useContractStore } from '@/store/contract';
export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "test-action-1", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

const setContract = async (contract: any, wallet: string | null) => {
  const { data, error } = await supabase
      .from('contracts')
      .insert({
        owner_wallet: wallet,
        content: contract?.content,
      })
      .select()
      .single();

      if (error) {
        console.error('Error fetching contract', error);
      } else {
      return data;
      }

}
   
const notify = () => toast('Contract signed successfully');


interface VerifyBlockProps {
  setShowSignatureModal: (show: boolean) => void;
}


export const VerifyBlock = ({ setShowSignatureModal }: VerifyBlockProps) => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
const {contract} = useContractStore();
  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    setIsLoading(true);

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === "error") {
        console.log("Command error");
        console.log(finalPayload);
        setHandleVerifyResponse(finalPayload);
        return finalPayload;
      }

      const verifyResponse = await fetch(`/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult,
          action: verifyPayload.action,
          signal: verifyPayload.signal,
        }),
      });

      const verifyResponseJson = await verifyResponse.json();

      if (verifyResponseJson.status === 200) {
        notify();
        console.log("Verification success!");
        console.log(finalPayload);
        setShowSignatureModal(false);
        /* setWallet(MiniKit?.user?.walletAddress || null); */
        await setContract(contract, MiniKit?.user?.walletAddress || null); 
       
        useUserStore.getState().setUser({ wallet: verifyResponseJson.user.wallet });
        // Handle redirect
        window.location.href = verifyResponseJson.redirect;
      }

      setHandleVerifyResponse(verifyResponseJson);
      return verifyResponseJson;
    } catch (error) {
      console.error("Verification error:", error);
   
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* const handleWalletCheck = async () => {
    if (wallet !== undefined) {
     
      const notify = () => toast('Here is your toast.');
     
      return null;
    }
  }

  if (wallet !== undefined) {
    handleWalletCheck();
    return null;
  }
 */
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800">Verify Identity</h1>
      <button
        onClick={handleVerify}
        disabled={isLoading}
        className="w-full px-6 py-3 text-white font-semibold bg-green-500 hover:bg-green-600 
          rounded-lg transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Verifying..." : "Verify Now"}
      </button>
      {handleVerifyResponse && (
        <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg overflow-x-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
            {JSON.stringify(handleVerifyResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
