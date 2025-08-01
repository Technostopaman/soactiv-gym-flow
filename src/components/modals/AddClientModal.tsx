import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, Camera, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClientModal({ open, onOpenChange }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+1",
    contactNumber: "",
    email: "",
    gender: "",
    address: "",
    emergencyName: "",
    emergencyCountryCode: "+1",
    emergencyNumber: "",
    emergencyRelationship: "",
    salesRep: "",
    memberManager: "",
    trainer: "",
    attendanceId: "",
    clubId: "",
    gstNo: ""
  });

  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const [notifications, setNotifications] = useState({
    sms: true,
    mail: true,
    push: true,
    whatsapp: true,
    mailerList: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, dateOfBirth, notifications });
    // Here you would typically save to database via Supabase
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      countryCode: "+1",
      contactNumber: "",
      email: "",
      gender: "",
      address: "",
      emergencyName: "",
      emergencyCountryCode: "+1",
      emergencyNumber: "",
      emergencyRelationship: "",
      salesRep: "",
      memberManager: "",
      trainer: "",
      attendanceId: "",
      clubId: "",
      gstNo: ""
    });
    setDateOfBirth(undefined);
    setNotifications({
      sms: true,
      mail: true,
      push: true,
      whatsapp: true,
      mailerList: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Contact Number *</Label>
                  <div className="flex gap-2">
                    <Select value={formData.countryCode} onValueChange={(value) => handleInputChange("countryCode", value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+86">+86</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                      placeholder="123 456 7890"
                      className="flex-1"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={(date) => {
                          setDateOfBirth(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter full address"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input
                    id="emergencyName"
                    value={formData.emergencyName}
                    onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                    placeholder="Emergency contact name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Select value={formData.emergencyRelationship} onValueChange={(value) => handleInputChange("emergencyRelationship", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Emergency Contact Number</Label>
                  <div className="flex gap-2">
                    <Select value={formData.emergencyCountryCode} onValueChange={(value) => handleInputChange("emergencyCountryCode", value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+86">+86</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={formData.emergencyNumber}
                      onChange={(e) => handleInputChange("emergencyNumber", e.target.value)}
                      placeholder="123 456 7890"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Sales Representative</Label>
                  <Select value={formData.salesRep} onValueChange={(value) => handleInputChange("salesRep", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sales rep" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="alex">Alex Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Member Manager</Label>
                  <Select value={formData.memberManager} onValueChange={(value) => handleInputChange("memberManager", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="alex">Alex Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Trainer</Label>
                  <Select value={formData.trainer} onValueChange={(value) => handleInputChange("trainer", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="alex">Alex Brown</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IDs and References */}
          <Card>
            <CardHeader>
              <CardTitle>IDs and References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="attendanceId">Attendance ID</Label>
                  <Input
                    id="attendanceId"
                    value={formData.attendanceId}
                    onChange={(e) => handleInputChange("attendanceId", e.target.value)}
                    placeholder="Auto-generated"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clubId">Club ID</Label>
                  <Input
                    id="clubId"
                    value={formData.clubId}
                    onChange={(e) => handleInputChange("clubId", e.target.value)}
                    placeholder="Club identification"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gstNo">GST Number</Label>
                  <Input
                    id="gstNo"
                    value={formData.gstNo}
                    onChange={(e) => handleInputChange("gstNo", e.target.value)}
                    placeholder="GST number (if applicable)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                  <Label>SMS</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notifications.mail}
                    onCheckedChange={(checked) => handleNotificationChange("mail", checked)}
                  />
                  <Label>Mail</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                  <Label>Push</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notifications.whatsapp}
                    onCheckedChange={(checked) => handleNotificationChange("whatsapp", checked)}
                  />
                  <Label>WhatsApp</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notifications.mailerList}
                    onCheckedChange={(checked) => handleNotificationChange("mailerList", checked)}
                  />
                  <Label>Mailer List</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Member
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}