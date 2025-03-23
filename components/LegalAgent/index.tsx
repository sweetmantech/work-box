"use client";


import { MiniKit, WalletAuthInput } from "@worldcoin/minikit-js";
import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  FileText,
  PenTool,
  AlertCircle,
  Download,
  Share2,
} from "lucide-react";

import { PayBlock } from "@/components/Pay";
import { VerifyBlock } from "@/components/Verify";
import { useContractStore } from "@/store/contract";




interface User {
  walletAddress: string | null;
  username: string | null;
  profilePictureUrl: string | null;
}

// Fix the walletAuthInput function
const walletAuthInput = (nonce: string): WalletAuthInput => ({
  nonce,
  statement: "Sign in with your wallet",
});

// Sample contract data
const _contractData = (contract: string) => ({
  id: "CON-2025-04-15-001",
  title: "Software Development Agreement",
  createdAt: "April 15, 2025",
  status: "pending",
  parties: [
    {
      id: "party-1",
      name: "ALEXIS",
      role: "Dev",
      status: "signed",
      signedAt: "April 15, 2025",
      email: "0xf30f83dbecb5fb8422c5eb8892f1e07395f36503",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "party-2",
      name: "Luca ",
      role: "Marketing",
      status: "signed",
      signedAt: "April 16, 2025",
      email: "0x6691f84d3f7af86f4702d9901f6d3bc9f6ec65dc",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "party-3",
      name: "Dagger",
      role: "Project Manager",
      status: "pending",
      signedAt: null,
      email: "0x29676a7670fefee3d0111c19c5b5c06d6cb1bad7",
      avatar: "/placeholder.svg?height=40&width=40",
    },
   
  ],
  content: `
  ${contract}
  `,
});

export default function ContractSigningModule() {
  const [activeTab, setActiveTab] = useState("contract");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const { contract } = useContractStore();

  const contractData = _contractData(contract || '');
  // Calculate overall contract status
  const signedCount = contractData.parties.filter(
    (party) => party.status === "signed"
  ).length;
  const totalParties = contractData.parties.length;
  const progress = Math.round((signedCount / totalParties) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
          >
            <CheckCircle2 className="h-3 w-3" />
            Signed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            Unknown
          </Badge>
        );
    }
  };






/*   useEffect(() => {
    const initWallet = async () => {
      if (!MiniKit.isInstalled()) {
        console.warn('Tried to invoke "walletAuth", but MiniKit is not installed.')
        return;
      }

      const res = await fetch(`/api/nonce`)
      const { nonce } = await res.json()

      const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthInput(nonce))

      if (finalPayload.status === 'error') {
        return
      } else {
        const response = await fetch('/api/complete-siwe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payload: finalPayload,
            nonce,
          }),
        })

        if (response.status === 200) {
          setUser(MiniKit.user)
        }
      }
    }

    initWallet();
  }, []); */ // Empty dependency array means this runs once on mount

/* 
  useEffect(() => {
    const storeUser = async () => {
      if (MiniKit.isInstalled() && MiniKit.user?.walletAddress) {
        // Set user in local state
        const userData = {
          walletAddress: MiniKit.user.walletAddress,
          username: MiniKit.user.username,
          profilePictureUrl: MiniKit.user.profilePictureUrl
        };
        setUser(userData);

    
          

      }
    };

    storeUser();
  }, []);
 */



  
  return (
    <div className="space-y-6">
      {/* Contract Header */}
      <Card className="border-muted shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{contractData.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <FileText className="h-4 w-4" />
                Contract ID: {contractData.id}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => setShowSignatureModal(true)}
              >
                <PenTool className="h-4 w-4" />
                Sign Document
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-medium">Signing Progress:</div>
                <div className="text-sm text-muted-foreground">
                  {signedCount} of {totalParties} signatures
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="text-sm font-medium mb-2">
                Created on {contractData.createdAt}
              </div>
              <div className="text-sm text-muted-foreground">
                This contract requires signatures from all parties before it
                becomes legally binding.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Content and Signatories */}
      <Tabs
        defaultValue="contract"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contract">Contract Details</TabsTrigger>
          <TabsTrigger value="signatories">
            Signatories ({signedCount}/{totalParties})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contract" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div
                className="prose max-w-none h-[500px] overflow-y-auto border rounded-md p-4"
                dangerouslySetInnerHTML={{ __html: contractData.content }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signatories" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Signatories</CardTitle>
              <CardDescription>
                All parties must sign this document for it to be fully executed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractData.parties.map((party) => (
                  <div
                    key={party.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={party.avatar} alt={party.name} />
                        <AvatarFallback>{party.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{party.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {party.role}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {party.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(party.status)}
                      {party.signedAt && (
                        <div className="text-xs text-muted-foreground">
                          Signed on {party.signedAt}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t">
              <Button
                variant="outline"
                onClick={() => setActiveTab("contract")}
              >
                View Contract
              </Button>
              <Button onClick={() => setShowSignatureModal(true)}>
                <PenTool className="h-4 w-4 mr-2" />
                Sign Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <VerifyBlock setShowSignatureModal={setShowSignatureModal} />
        </div>
      )}
    </div>
  );
}
