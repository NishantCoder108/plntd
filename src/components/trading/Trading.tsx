import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, DollarSign, Leaf, Upload, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";

const TradeCard = () => {
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

  const { publicKey, connected, disconnect } = useWallet();

  const walletAddress = publicKey?.toString() || "Connect wallet ";
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //   const handleConnectWallet = () => {
  //     if (!publicKey) {
  //       // toast({
  //       // toast({
  //       //   title: "Wallet Connected",
  //       //   description: `Connected to ${publicKey?.slice(0, 6)}...${publicKey?.slice(-4)}`,
  //       // });

  //       toast("Wallet Connected");
  //       setIsWalletConnected(true);
  //     } else {
  //       // toast({
  //       //   title: "Wallet Disconnected",
  //       //   description: "Wallet disconnected successfully",
  //       // });

  //       toast("Wallet Disconnected");
  //       setIsWalletConnected(false);
  //     }
  //   };

  const handleTrade = (type: "buy" | "sell") => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      //   toast({
      //     title: "Invalid amount",
      //     description: "Please enter a valid amount greater than 0",
      //     variant: "destructive",
      //   });
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    if (type === "buy") {
      if (!name.trim()) {
        // toast({
        //   title: "Name required",
        //   description: "Please enter your name",
        //   variant: "destructive",
        // });

        toast.error("Please enter your name");
        return;
      }

      if (!image) {
        // toast({
        //   title: "Image required",
        //   description: "Please upload a picture of a tree",
        //   variant: "destructive",
        // });
        toast.error("Please upload a picture of a tree");
        return;
      }

      if (!isWalletConnected) {
        // toast({
        //   title: "Wallet not connected",
        //   description: "Please connect your wallet to continue",
        //   variant: "destructive",
        // });
        toast.error("Please connect your wallet to continue");
        return;
      }
    }

    setShowSuccess(true);

    // toast({
    //   title: type === 'buy' ? "Tokens Purchased!" : "Tokens Sold!",
    //   description: `Successfully ${type === 'buy' ? 'bought' : 'sold'} ${amount} #PLNTD tokens`,
    //   variant: "default",
    // });

    toast(type === "buy" ? "Tokens Purchased!" : "Tokens Sold!");
    setTimeout(() => {
      setAmount("");
      setShowSuccess(false);
      if (type === "buy") {
        setName("");
        setImage(null);
        setImagePreview(null);
      }
    }, 3000);
  };

  return (
    <Card className="glass-card w-full  rounded-none border-none">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="h-5 w-5 text-green-600 animate-pulse-green" />
          <CardTitle className="text-xl text-green-800 dark:text-green-400">
            Trade #PLNTD Tokens
          </CardTitle>
        </div>
        <CardDescription>
          Buy or sell #PLNTD tokens to support global reforestation efforts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-green-100"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-green-100"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="grid gap-4">
              <div className="w-full">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Label className="text-sm font-medium mb-1.5 block">
                  Wallet Address
                </Label>
                <div className="flex items-center gap-2">
                  <Input type="text" disabled value={walletAddress} />
                </div>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Amount (SOL)
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="token-input pl-10 w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="text-right text-sm text-muted-foreground mt-1">
                  = {amount ? (Number(amount) / 1.42).toFixed(2) : "0.00"}{" "}
                  #PLNTD
                </div>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="tree-image"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Upload Tree Picture
                </Label>
                <div className="border-2 border-dashed border-green-200 dark:border-green-800 rounded-md p-4 text-center">
                  {imagePreview ? (
                    <div className="relative flex flex-col items-center">
                      <Image
                        src={imagePreview}
                        alt="Tree preview"
                        className="max-h-[150px] object-contain rounded-md"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-green-200 text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="tree-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-10 w-10 text-green-600 mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload a picture of a tree
                      </span>
                      <input
                        id="tree-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-green-100 hover:bg-green-200 btn-green-gradient text-green-600 border border-green-200"
                disabled={showSuccess}
                onClick={() => handleTrade("buy")}
              >
                {showSuccess ? "Processing..." : "Buy #PLNTD Tokens"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="grid gap-4">
              <div className="w-full">
                <Label
                  htmlFor="sell-amount"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Amount (#PLNTD)
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <Input
                    id="sell-amount"
                    type="number"
                    placeholder="0.00"
                    className="token-input pl-10 w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="text-right text-sm text-muted-foreground mt-1">
                  = ${amount ? (Number(amount) * 1.42).toFixed(2) : "0.00"} USD
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-rose-100 hover:bg-rose-200 text-rose-600 border border-rose-200"
                disabled={showSuccess}
                onClick={() => handleTrade("sell")}
              >
                {showSuccess ? "Processing..." : "Sell #PLNTD Tokens"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-green-100 dark:border-green-900 pt-4">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <ArrowRightLeft className="h-3 w-3" />
          <span>1 #PLNTD = $1.42 USD</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TradeCard;
