/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XLKZlpnw5TZ
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const CheckoutPage = () => {
  return (
    <div className="flex flex-row w-full p-10 justify-center gap-10">
      <div className="max-w-xl w-full space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="w-full space-y-4">
              <div>
                <Label htmlFor="billing-name">Name</Label>
                <Input id="billing-name" placeholder="Name" />
              </div>
              <div>
                <Label htmlFor="billing-address">Address</Label>
                <Input id="billing-address" placeholder="Address" />
              </div>
              <div>
                <Label htmlFor="billing-city">City</Label>
                <Input id="billing-city" placeholder="City" />
              </div>
              <div>
                <Label htmlFor="billing-zip">ZIP</Label>
                <Input id="billing-zip" placeholder="ZIP" />
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="w-full space-y-4">
              <div>
                <Label htmlFor="shipping-name">Name</Label>
                <Input id="shipping-name" placeholder="Name" />
              </div>
              <div>
                <Label htmlFor="shipping-address">Address</Label>
                <Input id="shipping-address" placeholder="Address" />
              </div>
              <div>
                <Label htmlFor="shipping-city">City</Label>
                <Input id="shipping-city" placeholder="City" />
              </div>
              <div>
                <Label htmlFor="shipping-zip">ZIP</Label>
                <Input id="shipping-zip" placeholder="ZIP" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Payment Option</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup defaultValue="stripe" id="payment-option">
                <Label className="flex items-center gap-2" htmlFor="stripe">
                  <RadioGroupItem id="stripe" value="stripe" />
                  Stripe
                </Label>
                <Label className="flex items-center gap-2" htmlFor="delivery">
                  <RadioGroupItem id="delivery" value="delivery" />
                  Pay at Delivery
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <div>Subtotal</div>
              <div className="ml-auto">$169.00</div>
            </div>
            <div className="flex items-center">
              <div>Tax</div>
              <div className="ml-auto">$15.00</div>
            </div>
            <div className="flex items-center">
              <div>Shipping</div>
              <div className="ml-auto">$5.00</div>
            </div>
            <Separator />
            <div className="flex items-center font-medium">
              <div>Total</div>
              <div className="ml-auto">$189.00</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" variant="default">
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default CheckoutPage;
