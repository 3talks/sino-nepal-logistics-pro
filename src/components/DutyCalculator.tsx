import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calculator, Check, ChevronsUpDown, Package, Warehouse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import hsCodesData from "@/assets/hs-codes.json";

type Currency = "USD" | "CNY" | "NPR";

interface HSCode {
  hsCode: string;
  description: string;
  saarcothersCN: string;
}

interface WarehouseInfo {
  name: string;
  address: string;
  contact: string;
  phone: string;
}

const EXCHANGE_RATES: Record<Currency, number> = {
  NPR: 1,
  USD: 133.5,
  CNY: 18.5,
};

const WAREHOUSES: WarehouseInfo[] = [
  {
    name: "LHASA 拉萨仓库",
    address: "拉萨市堆龙德庆区桑木村委会对面海之星物流",
    contact: "朱万",
    phone: "15828181119",
  },
  {
    name: "KERUNG 吉隆仓库",
    address: "西藏自治区日喀则市吉隆县吉隆镇帮兴村海之星物流",
    contact: "朱万",
    phone: "17380942031",
  },
  {
    name: "CHENGDU 成都仓库",
    address: "成都市新都区大丰镇蓉北路528号1栋附102号拉萨海之星朱万",
    contact: "朱万",
    phone: "19981269226",
  },
  {
    name: "GUANGZHOU 广州仓库",
    address: "广州市白云区增槎路嘉忠物流园G座10-12仓拉萨海之星朱万",
    contact: "朱万",
    phone: "18922256744 / 18922256466",
  },
  {
    name: "YIWU 义乌仓库",
    address: "义乌市江东社区下湾村2区20栋18号店面拉萨海之星朱万",
    contact: "朱万",
    phone: "17348821156",
  },
];

const DutyCalculator = () => {
  const [hsCode, setHsCode] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [weight, setWeight] = useState("");
  const [freight, setFreight] = useState(0);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [cbmLength, setCbmLength] = useState("");
  const [cbmWidth, setCbmWidth] = useState("");
  const [cbmHeight, setCbmHeight] = useState("");
  const [cbmResult, setCbmResult] = useState(0);
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

  const selectedWarehouseInfo = WAREHOUSES.find(
    (warehouse) => warehouse.name === selectedWarehouse
  );

  // Calculate freight based on weight
  useEffect(() => {
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setFreight(0);
      return;
    }

    let rate = 0;
    if (weightValue < 20) {
      rate = 250;
    } else if (weightValue >= 20 && weightValue < 50) {
      rate = 180;
    } else if (weightValue >= 50 && weightValue <= 100) {
      rate = 150;
    } else {
      rate = 120;
    }

    setFreight(weightValue * rate);
  }, [weight]);

  const calculateCBM = () => {
    const length = parseFloat(cbmLength);
    const width = parseFloat(cbmWidth);
    const height = parseFloat(cbmHeight);

    if (isNaN(length) || isNaN(width) || isNaN(height)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid dimensions",
        variant: "destructive",
      });
      return;
    }

    const cbm = (length * width * height) / 1000000;
    setCbmResult(cbm);
    toast({
      title: "CBM Calculated",
      description: `Result: ${cbm.toFixed(4)} m³`,
    });
  };

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Duty Calculator */}
      <Card className="p-8 lg:col-span-2">
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
              <PopoverContent className="w-[500px] p-0 bg-background z-50" align="start">
                <Command className="bg-background">
                  <CommandInput placeholder="Search by HS code or description..." />
                  <CommandList className="max-h-[400px]">
                    <CommandEmpty>No HS code found.</CommandEmpty>
                    <CommandGroup>
                      {(hsCodesData as HSCode[]).map((item) => (
                        <CommandItem
                          key={item.hsCode}
                          value={`${item.hsCode} ${item.description}`}
                          onSelect={() => {
                            setHsCode(item.hsCode);
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              hsCode === item.hsCode ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">{item.hsCode}</span>
                            <span className="text-xs text-muted-foreground line-clamp-2">
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

          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <Label>Currency</Label>
            <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="CNY">CNY</SelectItem>
                <SelectItem value="NPR">NPR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {freight > 0 && (
            <div>
              <Label>Freight Cost</Label>
              <Input
                type="text"
                value={`NPR ${freight.toLocaleString()}`}
                readOnly
                className="bg-muted"
              />
            </div>
          )}

          <div>
            <Label>Select Warehouse</Label>
            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a warehouse" />
              </SelectTrigger>
              <SelectContent>
                {WAREHOUSES.map((warehouse) => (
                  <SelectItem key={warehouse.name} value={warehouse.name}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWarehouseInfo && (
            <Card className="p-4 bg-muted/50">
              <div className="flex items-start gap-3">
                <Warehouse className="w-5 h-5 text-primary mt-1" />
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Address:</span>
                    <p className="text-muted-foreground">{selectedWarehouseInfo.address}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Contact:</span>
                    <span className="text-muted-foreground ml-2">{selectedWarehouseInfo.contact}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>
                    <span className="text-muted-foreground ml-2">{selectedWarehouseInfo.phone}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <Button onClick={calculateDuty} className="w-full bg-gradient-card hover:opacity-90">
          Calculate Duty
        </Button>

        {result && (
          <Card className="mt-6 p-6 bg-muted/30">
            <h4 className="font-bold text-lg mb-4">Calculation Results</h4>
            
            <div className="text-sm text-muted-foreground mb-4">
              <span className="font-semibold">Product:</span> {result.hsDescription}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount in NPR</p>
                <p className="text-lg font-semibold">
                  NPR {result.amountInNPR.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Duty Rate</p>
                <p className="text-lg font-semibold">{result.dutyRate}%</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Duty Amount</p>
                <p className="text-lg font-semibold">
                  NPR {result.dutyAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-xl font-bold">
                  NPR {result.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}
      </Card>

      {/* CBM Calculator */}
      <Card className="p-6 h-fit">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-card rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-navy">CBM Calculator</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Length (cm)</Label>
            <Input
              type="number"
              placeholder="Enter length"
              value={cbmLength}
              onChange={(e) => setCbmLength(e.target.value)}
            />
          </div>

          <div>
            <Label>Width (cm)</Label>
            <Input
              type="number"
              placeholder="Enter width"
              value={cbmWidth}
              onChange={(e) => setCbmWidth(e.target.value)}
            />
          </div>

          <div>
            <Label>Height (cm)</Label>
            <Input
              type="number"
              placeholder="Enter height"
              value={cbmHeight}
              onChange={(e) => setCbmHeight(e.target.value)}
            />
          </div>

          <Button onClick={calculateCBM} className="w-full bg-gradient-card hover:opacity-90">
            Calculate CBM
          </Button>

          {cbmResult > 0 && (
            <div>
              <Label>CBM Result</Label>
              <Input
                type="text"
                value={`${cbmResult.toFixed(4)} m³`}
                readOnly
                className="bg-muted font-semibold"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DutyCalculator;
