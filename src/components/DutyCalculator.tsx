import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calculator, Check, ChevronsUpDown, Package, Warehouse, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import hsCodesData from "@/assets/hs-codes.json";
import jsPDF from "jspdf";

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
    bankCharge: number;
    insuranceCharge: number;
    grandTotal: number;
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

  const downloadPDF = () => {
    if (!result) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Company Header
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Nepal Samundrik Tara Pvt. Ltd", pageWidth / 2, 20, { align: "center" });
    
    pdf.setFontSize(16);
    pdf.text("QUOTATION", pageWidth / 2, 30, { align: "center" });
    
    // Line separator
    pdf.setLineWidth(0.5);
    pdf.line(20, 35, pageWidth - 20, 35);
    
    let yPos = 45;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    
    // Product Information
    pdf.setFont("helvetica", "bold");
    pdf.text("Product Details:", 20, yPos);
    yPos += 8;
    pdf.setFont("helvetica", "normal");
    pdf.text(`HS Code: ${hsCode}`, 25, yPos);
    yPos += 6;
    pdf.text(`Description: ${result.hsDescription.substring(0, 80)}`, 25, yPos);
    yPos += 10;
    
    // Warehouse Information
    if (selectedWarehouseInfo) {
      pdf.setFont("helvetica", "bold");
      pdf.text("Warehouse Details:", 20, yPos);
      yPos += 8;
      pdf.setFont("helvetica", "normal");
      pdf.text(`Name: ${selectedWarehouseInfo.name}`, 25, yPos);
      yPos += 6;
      pdf.text(`Address: ${selectedWarehouseInfo.address}`, 25, yPos);
      yPos += 6;
      pdf.text(`Contact: ${selectedWarehouseInfo.contact}`, 25, yPos);
      yPos += 6;
      pdf.text(`Phone: ${selectedWarehouseInfo.phone}`, 25, yPos);
      yPos += 10;
    }
    
    // Calculation Details
    pdf.setFont("helvetica", "bold");
    pdf.text("Calculation Summary:", 20, yPos);
    yPos += 8;
    pdf.setFont("helvetica", "normal");
    
    const weightValue = parseFloat(weight) || 0;
    pdf.text(`Weight: ${weightValue.toFixed(2)} kg`, 25, yPos);
    yPos += 6;
    
    if (cbmResult > 0) {
      pdf.text(`CBM: ${cbmResult.toFixed(4)} m³`, 25, yPos);
      yPos += 6;
    }
    
    yPos += 4;
    pdf.text(`Goods Value: NPR ${result.amountInNPR.toLocaleString()}`, 25, yPos);
    yPos += 6;
    pdf.text(`Duty Rate: ${result.dutyRate}%`, 25, yPos);
    yPos += 6;
    pdf.text(`Duty Amount: NPR ${result.dutyAmount.toLocaleString()}`, 25, yPos);
    yPos += 6;
    pdf.text(`Freight Amount: NPR ${freight.toLocaleString()}`, 25, yPos);
    yPos += 6;
    pdf.text(`Bank Document Charge (5%): NPR ${result.bankCharge.toLocaleString()}`, 25, yPos);
    yPos += 6;
    pdf.text(`Insurance Charge (0.005%): NPR ${result.insuranceCharge.toLocaleString()}`, 25, yPos);
    yPos += 10;
    
    // Total
    pdf.setLineWidth(0.3);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`TOTAL PAYABLE AMOUNT: NPR ${result.grandTotal.toLocaleString()}`, 25, yPos);
    
    // Footer
    yPos = pdf.internal.pageSize.getHeight() - 20;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, yPos, { align: "center" });
    
    pdf.save("quotation.pdf");
    
    toast({
      title: "PDF Downloaded",
      description: "Your quotation has been downloaded successfully",
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
    const bankCharge = (amountInNPR * 5) / 100;
    const insuranceCharge = (amountInNPR * 0.005) / 100;
    const totalAmount = amountInNPR + dutyAmount;
    const grandTotal = totalAmount + freight + bankCharge + insuranceCharge;

    setResult({
      dutyRate,
      dutyAmount,
      totalAmount,
      amountInNPR,
      hsDescription: hsCodeData.description,
      bankCharge,
      insuranceCharge,
      grandTotal,
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
          <div className="mt-6 space-y-4">
            <Card className="p-6 bg-muted/30">
              <h4 className="font-bold text-lg mb-4">Calculation Results</h4>
              
              <div className="text-sm text-muted-foreground mb-4">
                <span className="font-semibold">Product:</span> {result.hsDescription}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Goods Value</span>
                  <span className="font-semibold">NPR {result.amountInNPR.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Duty Amount ({result.dutyRate}%)</span>
                  <span className="font-semibold">NPR {result.dutyAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Freight Charge</span>
                  <span className="font-semibold">NPR {freight.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Bank Document Charge (5%)</span>
                  <span className="font-semibold">NPR {result.bankCharge.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Insurance Charge (0.005%)</span>
                  <span className="font-semibold">NPR {result.insuranceCharge.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-3 mt-2 bg-primary/10 px-4 rounded-lg">
                  <span className="font-bold text-lg">Total Payable Amount</span>
                  <span className="font-bold text-xl text-primary">NPR {result.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Button 
              onClick={downloadPDF} 
              className="w-full bg-gradient-card hover:opacity-90"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Quotation PDF
            </Button>
          </div>
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
