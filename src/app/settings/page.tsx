"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Check,
  Moon,
  Sun
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge"; // Added Badge import to settings page

type SettingsCategory =
  | "profile"
  | "appearance"
  | "notifications"
  | "security"
  | "payment"
  | "help";

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("profile");
  const { theme, toggleTheme } = useTheme();

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "profile":
        return <ProfileSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      case "payment":
        return <PaymentSettings />;
      case "help":
        return <HelpSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white">Settings</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Settings Categories */}
              <div className="w-full md:w-64 shrink-0">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-3">
                    <div className="space-y-1">
                      <SettingsCategoryButton
                        label="Profile"
                        icon={<User className="h-4 w-4" />}
                        active={activeCategory === "profile"}
                        onClick={() => setActiveCategory("profile")}
                      />
                      <SettingsCategoryButton
                        label="Appearance"
                        icon={<Moon className="h-4 w-4" />}
                        active={activeCategory === "appearance"}
                        onClick={() => setActiveCategory("appearance")}
                      />
                      <SettingsCategoryButton
                        label="Notifications"
                        icon={<Bell className="h-4 w-4" />}
                        active={activeCategory === "notifications"}
                        onClick={() => setActiveCategory("notifications")}
                      />
                      <SettingsCategoryButton
                        label="Security"
                        icon={<Lock className="h-4 w-4" />}
                        active={activeCategory === "security"}
                        onClick={() => setActiveCategory("security")}
                      />
                      <SettingsCategoryButton
                        label="Payment Methods"
                        icon={<CreditCard className="h-4 w-4" />}
                        active={activeCategory === "payment"}
                        onClick={() => setActiveCategory("payment")}
                      />
                      <SettingsCategoryButton
                        label="Help & Support"
                        icon={<HelpCircle className="h-4 w-4" />}
                        active={activeCategory === "help"}
                        onClick={() => setActiveCategory("help")}
                      />
                    </div>

                    <div className="pt-4 mt-4 border-t dark:border-gray-700">
                      <button className="w-full flex items-center gap-2 p-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Log Out</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium dark:text-white">
                      {activeCategory === "profile" && "Profile Settings"}
                      {activeCategory === "appearance" && "Appearance Settings"}
                      {activeCategory === "notifications" && "Notification Preferences"}
                      {activeCategory === "security" && "Security Settings"}
                      {activeCategory === "payment" && "Payment Methods"}
                      {activeCategory === "help" && "Help & Support"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderCategoryContent()}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface SettingsCategoryButtonProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function SettingsCategoryButton({ label, icon, active, onClick }: SettingsCategoryButtonProps) {
  return (
    <button
      className={`w-full flex items-center justify-between p-2 rounded-md ${
        active
          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="h-20 w-20 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <img
            src="https://github.com/shadcn.png"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium dark:text-white">Profile Picture</p>
          <div className="flex gap-2">
            <Button variant="outline" className="dark:bg-gray-800 dark:border-gray-700">Change Photo</Button>
            <Button variant="outline" className="text-red-500 dark:bg-gray-800 dark:border-gray-700">Remove</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-500 dark:text-gray-400">First Name</Label>
          <Input id="firstName" defaultValue="John" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-500 dark:text-gray-400">Last Name</Label>
          <Input id="lastName" defaultValue="Doe" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-500 dark:text-gray-400">Email Address</Label>
          <Input id="email" defaultValue="john.doe@example.com" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-500 dark:text-gray-400">Phone Number</Label>
          <Input id="phone" defaultValue="+1 (555) 123-4567" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-base font-medium dark:text-white">Dark Theme</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark mode for the dashboard</p>
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-blue-500" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-4">
        <h3 className="text-base font-medium mb-4 dark:text-white">Dashboard Theme</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ThemeOption name="Default" active={true} preview="#3b82f6" />
          <ThemeOption name="Purple" active={false} preview="#8b5cf6" />
          <ThemeOption name="Green" active={false} preview="#10b981" />
          <ThemeOption name="Red" active={false} preview="#ef4444" />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-base font-medium dark:text-white">Email Notifications</h3>

        <ToggleSetting
          title="Account Activity"
          description="Get notified about important account activities"
          defaultChecked={true}
        />

        <ToggleSetting
          title="Transaction Updates"
          description="Receive updates when transactions are processed"
          defaultChecked={true}
        />

        <ToggleSetting
          title="Billing Alerts"
          description="Get notified about upcoming bills and payments"
          defaultChecked={true}
        />

        <ToggleSetting
          title="Newsletter"
          description="Receive our weekly newsletter and product updates"
          defaultChecked={false}
        />
      </div>

      <div className="border-t dark:border-gray-700 pt-4 mt-4 space-y-4">
        <h3 className="text-base font-medium dark:text-white">App Notifications</h3>

        <ToggleSetting
          title="Push Notifications"
          description="Receive push notifications on your mobile device"
          defaultChecked={true}
        />

        <ToggleSetting
          title="Transaction Alerts"
          description="Get real-time alerts for all transactions"
          defaultChecked={true}
        />

        <ToggleSetting
          title="Security Alerts"
          description="Receive alerts about security-related activities"
          defaultChecked={true}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-base font-medium dark:text-white">Password & Authentication</h3>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium dark:text-white">Change Password</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly for better security</p>
            </div>
            <Button variant="outline" className="dark:bg-gray-800 dark:border-gray-700">
              Change
            </Button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium dark:text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add an additional layer of security to your account</p>
            </div>
            <Button variant="outline" className="dark:bg-gray-800 dark:border-gray-700">
              Enable
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-4 space-y-4">
        <h3 className="text-base font-medium dark:text-white">Login Sessions</h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium dark:text-white">Current Session</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mac • Chrome • New York, USA</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              Active
            </Badge>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium dark:text-white">Mobile App</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">iPhone • BankDash App • New York, USA</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-red-500 h-8 dark:bg-gray-800 dark:border-gray-700">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium dark:text-white">Connected Payment Methods</h3>
          <Button size="sm" className="h-8">Add New</Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium dark:text-white">**** **** **** 4242</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Visa • Expires 12/24</p>
              </div>
            </div>
            <Badge className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-none">
              Primary
            </Badge>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-md flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium dark:text-white">**** **** **** 5678</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mastercard • Expires 08/25</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-400">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-400">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-4 space-y-4">
        <h3 className="text-base font-medium dark:text-white">Billing Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-500 dark:text-gray-400">Street Address</Label>
            <Input id="address" defaultValue="123 Banking St" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-500 dark:text-gray-400">City</Label>
            <Input id="city" defaultValue="New York" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-gray-500 dark:text-gray-400">State</Label>
            <Input id="state" defaultValue="NY" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-gray-500 dark:text-gray-400">Zip Code</Label>
            <Input id="zipCode" defaultValue="10001" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

function HelpSettings() {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <h3 className="text-lg font-medium mb-4 dark:text-white">Frequently Asked Questions</h3>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-2 dark:text-white">How do I reset my password?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              To reset your password, go to the login page and click on "Forgot Password".
              You'll receive an email with instructions to create a new password.
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-2 dark:text-white">How do I link a new bank account?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Go to "Accounts" page and click on "Add New Account". You'll be guided through
              the process of securely linking your external bank account.
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-2 dark:text-white">Is my financial data secure?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Yes, we use bank-level 256-bit encryption to protect your data. We never store
              your actual bank credentials, and all data transfers are secured with SSL.
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-2 dark:text-white">How do I contact customer support?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can reach our customer support team through email at support@bankdash.com
              or call us at 1-800-BANK-DASH. Our support hours are 24/7.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-6 mt-6">
        <h3 className="text-base font-medium mb-4 dark:text-white">Need More Help?</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button>Contact Support</Button>
          <Button variant="outline" className="dark:bg-gray-800 dark:border-gray-700">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ToggleSettingProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

function ToggleSetting({ title, description, defaultChecked = false }: ToggleSettingProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-0.5">
        <h4 className="text-sm font-medium dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}

interface ThemeOptionProps {
  name: string;
  active: boolean;
  preview: string;
}

function ThemeOption({ name, active, preview }: ThemeOptionProps) {
  return (
    <div className={`rounded-lg border p-2 cursor-pointer hover:border-blue-500 ${
      active ? "border-blue-500 dark:border-blue-500" : "border-gray-200 dark:border-gray-700"
    }`}>
      <div className="h-12 rounded-md mb-2" style={{ backgroundColor: preview }}></div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium dark:text-white">{name}</span>
        {active && <Check className="h-4 w-4 text-blue-500" />}
      </div>
    </div>
  );
}
