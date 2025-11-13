import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calculator, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import hsCodesData from "@/assets/hs-codes.json";

type Currency = "USD" | "CNY" | "NPR";

interface HSCode {
  hsCode: string;
  description: string;
  saarcothersCN: string;
}

const EXCHANGE_RATES: Record<Currency, number> = {
  NPR: 1,
  USD: 133.5,
  CNY: 18.5,
};

const DutyCalculator = () => {
  const [hsCode, setHsCode] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    dutyRate: number;
    dutyAmount: number;
    totalAmount: number;
    amountInNPR: number;
    hsDescription: string;
  } | null>(null);
  const { toast } = useToast();

  const selectedHSCode = (hsCodesData as HSCode[]).find(
    (item) => item.hsCode === hsCode
  );

  const calculateDuty = () => {
    if (!hsCode || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter both HS code and amount",
        variant: "destructive",
      });
      return;
    }

    const hsCodeData = (hsCodesData as HSCode[]).find(
      (item) => item.hsCode === hsCode.replace(/\s/g, "")
    );

    if (!hsCodeData) {
      toast({
        title: "HS Code Not Found",
        description: "Please enter a valid HS code",
        variant: "destructive",
      });
      return;
    }

    const dutyRate = parseFloat(hsCodeData.saarcothersCN);
    const amountValue = parseFloat(amount);
    const amountInNPR = amountValue * EXCHANGE_RATES[currency];
    const dutyAmount = (amountInNPR * dutyRate) / 100;
    const totalAmount = amountInNPR + dutyAmount;

    setResult({
      dutyRate,
      dutyAmount,
      totalAmount,
      amountInNPR,
      hsDescription: hsCodeData.description,
    });

    toast({
      title: "Duty Calculated",
      description: "Your duty calculation is ready",
    });
  };

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-card rounded-full flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-navy">Duty Calculator</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label>HS Code</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {hsCode ? (
                  <span className="truncate">
                    {hsCode} - {selectedHSCode?.description.substring(0, 50)}...
                  </span>
                ) : (
                  "Search HS code or description..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search by HS code or description..." />
                <CommandList>
                  <CommandEmpty>No HS code found.</CommandEmpty>
                  <CommandGroup>
                    {(hsCodesData as HSCode[]).slice(0, 100).map((item) => (
                      <CommandItem
                        key={item.hsCode}
                        value={`${item.hsCode} ${item.description}`}
                        onSelect={() => {
                          setHsCode(item.hsCode);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            hsCode === item.hsCode ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">{item.hsCode}</span>
                          <span className="text-xs text-gray-600 line-clamp-2">
                            {item.description}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="CNY">CNY (¥)</SelectItem>
                <SelectItem value="NPR">NPR (रू)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateDuty} className="w-full" variant="hero">
          Calculate Duty
        </Button>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-navy/5 rounded-lg space-y-3">
          <h4 className="font-bold text-navy mb-4">Calculation Results</h4>
          
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Product:</span> {result.hsDescription}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Exchange Rate</p>
              <p className="text-lg font-semibold text-navy">
                1 {currency} = रू {EXCHANGE_RATES[currency].toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Amount in NPR</p>
              <p className="text-lg font-semibold text-navy">
                रू {result.amountInNPR.toLocaleString('en-NP', { maximumFractionDigits: 2 })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Duty Rate</p>
              <p className="text-lg font-semibold text-teal">{result.dutyRate}%</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Duty Amount</p>
              <p className="text-lg font-semibold text-teal">
                रू {result.dutyAmount.toLocaleString('en-NP', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-navy/10 mt-4">
            <p className="text-sm text-gray-600">Total Amount (with Duty)</p>
            <p className="text-2xl font-bold text-navy">
              रू {result.totalAmount.toLocaleString('en-NP', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            * Exchange rates are approximate and may vary. Please verify with current rates.
          </p>
        </div>
      )}
    </Card>
  );
};

export default DutyCalculator;
