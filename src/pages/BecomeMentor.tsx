import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, ArrowLeft, CheckCircle, Star, Users, Clock, 
  DollarSign, Globe, Award, Plus, X, Menu
} from "lucide-react";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

interface ApplicationForm {
  name: string;
  email: string;
  company: string;
  position: string;
  experience: string;
  expertise: string[];
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  hourlyRate: number;
  availability: string;
  languages: string[];
  timezone: string;
  motivation: string;
}

const BecomeMentor = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState<ApplicationForm>({
    name: '',
    email: '',
    company: '',
    position: '',
    experience: '',
    expertise: [],
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    hourlyRate: 100,
    availability: '',
    languages: [],
    timezone: '',
    motivation: ''
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof ApplicationForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !form.expertise.includes(currentSkill.trim())) {
      setForm(prev => ({
        ...prev,
        expertise: [...prev.expertise, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setForm(prev => ({
      ...prev,
      expertise: prev.expertise.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage.trim() && !form.languages.includes(currentLanguage.trim())) {
      setForm(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage.trim()]
      }));
      setCurrentLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setForm(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'company', 'position', 'experience', 'bio', 'availability', 'timezone', 'motivation'];
    
    for (const field of requiredFields) {
      if (!form[field as keyof ApplicationForm] || (form[field as keyof ApplicationForm] as string).toString().trim() === '') {
        toast({
          title: "Error",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (form.expertise.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one area of expertise",
        variant: "destructive",
      });
      return false;
    }

    if (form.languages.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one language",
        variant: "destructive",
      });
      return false;
    }

    if (!form.email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await api.submitMentorApplication(form);
      
      if (result.success) {
        setSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: "We'll review your application and get back to you within 3-5 business days.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent truncate">
                MentorSetu.ai
              </h1>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-4">Application Submitted!</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
              Thank you for your interest in becoming a mentor. We'll review your application and get back to you within 3-5 business days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
              <Link to="/mentors" className="w-full sm:w-auto">
                <Button variant="cta" size="lg" className="w-full sm:w-auto">
                  Browse Mentors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent truncate">
              MentorSetu.ai
            </h1>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/" className="hidden sm:block">
              <Button variant="ghost" className="flex items-center gap-2" size="sm">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden md:inline">Back to Home</span>
                <span className="md:hidden">Back</span>
              </Button>
            </Link>
            <Link to="/" className="sm:hidden">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-hero bg-clip-text text-transparent px-4">
            Become a Mentor
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Share your expertise and help the next generation of professionals grow their careers
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <Card className="text-center bg-gradient-card shadow-soft">
              <CardContent className="p-4 sm:p-6">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Earn Extra Income</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Set your own hourly rate and earn money sharing your knowledge</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-soft">
              <CardContent className="p-4 sm:p-6">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Make an Impact</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Help professionals advance their careers and achieve their goals</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-soft sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Choose when and how often you want to mentor based on your availability</p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-medium">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl">Mentor Application</CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground">Tell us about yourself and your expertise</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Professional Information */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium">Current Company *</Label>
                        <Input
                          id="company"
                          placeholder="e.g., Google, Microsoft, Startup"
                          value={form.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-sm font-medium">Current Position *</Label>
                        <Input
                          id="position"
                          placeholder="e.g., Senior Software Engineer"
                          value={form.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium">Years of Experience *</Label>
                      <Select value={form.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="5-8 years">5-8 years</SelectItem>
                          <SelectItem value="8-12 years">8-12 years</SelectItem>
                          <SelectItem value="12+ years">12+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Expertise */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">Areas of Expertise *</h3>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 min-h-[40px] p-2 border rounded-md bg-muted/30">
                      {form.expertise.length > 0 ? (
                        form.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                            <span className="truncate max-w-[120px] sm:max-w-none">{skill}</span>
                            <X 
                              className="h-3 w-3 cursor-pointer flex-shrink-0" 
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No skills added yet</span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="Add a skill (e.g., React, Product Management)"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addSkill} variant="outline" className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-1" />
                        <span className="sm:hidden">Add Skill</span>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Bio and Links */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">About You</h3>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about your background, experience, and what makes you a great mentor..."
                        rows={4}
                        value={form.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={form.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                          className="w-full text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github" className="text-sm font-medium">GitHub URL</Label>
                        <Input
                          id="github"
                          placeholder="https://github.com/yourusername"
                          value={form.githubUrl}
                          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                          className="w-full text-sm"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <Label htmlFor="portfolio" className="text-sm font-medium">Portfolio URL</Label>
                        <Input
                          id="portfolio"
                          placeholder="https://yourportfolio.com"
                          value={form.portfolioUrl}
                          onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                          className="w-full text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Mentoring Details */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">Mentoring Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate" className="text-sm font-medium">Hourly Rate (USD) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          min="50"
                          max="500"
                          value={form.hourlyRate}
                          onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-sm font-medium">Timezone *</Label>
                        <Select value={form.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PST">PST (Pacific)</SelectItem>
                            <SelectItem value="MST">MST (Mountain)</SelectItem>
                            <SelectItem value="CST">CST (Central)</SelectItem>
                            <SelectItem value="EST">EST (Eastern)</SelectItem>
                            <SelectItem value="GMT">GMT (Greenwich)</SelectItem>
                            <SelectItem value="IST">IST (India)</SelectItem>
                            <SelectItem value="JST">JST (Japan)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability" className="text-sm font-medium">Availability *</Label>
                      <Textarea
                        id="availability"
                        placeholder="Describe when you're typically available for mentoring sessions..."
                        rows={3}
                        value={form.availability}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                        className="w-full resize-none"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Languages */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">Languages *</h3>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 min-h-[40px] p-2 border rounded-md bg-muted/30">
                      {form.languages.length > 0 ? (
                        form.languages.map((language) => (
                          <Badge key={language} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                            <span className="truncate max-w-[120px] sm:max-w-none">{language}</span>
                            <X 
                              className="h-3 w-3 cursor-pointer flex-shrink-0" 
                              onClick={() => removeLanguage(language)}
                            />
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No languages added yet</span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="Add a language (e.g., English, Spanish)"
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addLanguage} variant="outline" className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-1" />
                        <span className="sm:hidden">Add Language</span>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Motivation */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">Why do you want to become a mentor? *</h3>
                    <Textarea
                      placeholder="Share your motivation for becoming a mentor and how you plan to help mentees..."
                      rows={4}
                      value={form.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      className="w-full resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full"
                      variant="hero"
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeMentor;