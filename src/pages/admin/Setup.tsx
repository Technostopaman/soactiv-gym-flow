import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Building, Users, Bell, Mail, Smartphone, Globe, CreditCard, Shield } from "lucide-react";

export default function Setup() {
  const [gymSettings, setGymSettings] = useState({
    gymName: "SoActiv Fitness Center",
    address: "123 Fitness Street, Health City, HC 12345",
    phone: "+1 234 567 8900",
    email: "info@soactiv.com",
    website: "www.soactiv.com",
    timezone: "America/New_York",
    currency: "USD"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    membershipExpiry: true,
    paymentReminders: true,
    staffUpdates: true,
    newEnquiries: true
  });

  const [membershipPlans, setMembershipPlans] = useState([
    { id: 1, name: "Basic Monthly", duration: "1 month", price: 49, features: ["Gym Access", "Group Classes"] },
    { id: 2, name: "Standard Monthly", duration: "1 month", price: 79, features: ["Gym Access", "Group Classes", "Nutrition Consultation"] },
    { id: 3, name: "Premium Monthly", duration: "1 month", price: 129, features: ["Gym Access", "Group Classes", "Personal Training", "Nutrition Plan"] },
    { id: 4, name: "Annual Premium", duration: "12 months", price: 1299, features: ["All Premium Features", "Discounted Rate", "Priority Booking"] }
  ]);

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings`);
    // Here you would save to Supabase
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Setup & Configuration</h1>
        <p className="text-muted-foreground">Configure gym settings, plans, and system preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Gym Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gymName">Gym Name</Label>
                  <Input
                    id="gymName"
                    value={gymSettings.gymName}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, gymName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={gymSettings.phone}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={gymSettings.email}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={gymSettings.website}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={gymSettings.timezone} onValueChange={(value) => setGymSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={gymSettings.currency} onValueChange={(value) => setGymSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={gymSettings.address}
                  onChange={(e) => setGymSettings(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button onClick={() => handleSaveSettings('general')} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Membership Plans */}
        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membership Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {membershipPlans.map((plan) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{plan.name}</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        <span>{plan.duration}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-medium">${plan.price}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Features: </span>
                        <span>{plan.features.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-4">
                  Add New Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Communication Channels</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <Label>SMS Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label>Push Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                
                <div className="flex items-center justify-between">
                  <Label>Membership Expiry Alerts</Label>
                  <Switch
                    checked={notificationSettings.membershipExpiry}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, membershipExpiry: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Payment Reminders</Label>
                  <Switch
                    checked={notificationSettings.paymentReminders}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, paymentReminders: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Staff Updates</Label>
                  <Switch
                    checked={notificationSettings.staffUpdates}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, staffUpdates: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>New Enquiry Alerts</Label>
                  <Switch
                    checked={notificationSettings.newEnquiries}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, newEnquiries: checked }))}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings('notifications')} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Payment Gateway Integration</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with Supabase to enable Stripe payment processing for automatic billing and payment collection.
                </p>
                <Button variant="outline">Configure Payment Gateway</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Payment Settings</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Due Days</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Late Payment Fee</Label>
                    <Input placeholder="$10.00" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Authentication & Access Control</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with Supabase to enable advanced authentication features including two-factor authentication and role-based access control.
                </p>
                <Button variant="outline">Configure Authentication</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Security Options</h4>
                
                <div className="flex items-center justify-between">
                  <Label>Require Two-Factor Authentication</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Auto-logout after inactivity</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Login attempt notifications</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}