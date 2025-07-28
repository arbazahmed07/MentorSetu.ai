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
  DollarSign, Globe, Award, Plus, X
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
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                MentorSetu.ai
              </h1>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your interest in becoming a mentor. We'll review your application and get back to you within 3-5 business days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
              <Link to="/mentors">
                <Button variant="cta" size="lg">
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MentorSetu.ai
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Become a Mentor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your expertise and help the next generation of professionals grow their careers
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Extra Income</h3>
                <p className="text-muted-foreground">Set your own hourly rate and earn money sharing your knowledge</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
                <p className="text-muted-foreground">Help professionals advance their careers and achieve their goals</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-muted-foreground">Choose when and how often you want to mentor based on your availability</p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Mentor Application</CardTitle>
                <p className="text-muted-foreground">Tell us about yourself and your expertise</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Current Company *</Label>
                        <Input
                          id="company"
                          placeholder="e.g., Google, Microsoft, Startup"
                          value={form.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Current Position *</Label>
                        <Input
                          id="position"
                          placeholder="e.g., Senior Software Engineer"
                          value={form.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Select value={form.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger>
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Areas of Expertise *</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeSkill(skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill (e.g., React, Product Management)"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Bio and Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">About You</h3>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about your background, experience, and what makes you a great mentor..."
                        rows={4}
                        value={form.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={form.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input
                          id="github"
                          placeholder="https://github.com/yourusername"
                          value={form.githubUrl}
                          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input
                          id="portfolio"
                          placeholder="https://yourportfolio.com"
                          value={form.portfolioUrl}
                          onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Mentoring Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Mentoring Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate (USD) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          min="50"
                          max="500"
                          value={form.hourlyRate}
                          onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone *</Label>
                        <Select value={form.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                          <SelectTrigger>
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
                      <Label htmlFor="availability">Availability *</Label>
                      <Textarea
                        id="availability"
                        placeholder="Describe when you're typically available for mentoring sessions..."
                        rows={2}
                        value={form.availability}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Languages */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Languages *</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="flex items-center gap-1">
                          {language}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeLanguage(language)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a language (e.g., English, Spanish)"
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                      />
                      <Button type="button" onClick={addLanguage} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Motivation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Why do you want to become a mentor? *</h3>
                    <Textarea
                      placeholder="Share your motivation for becoming a mentor and how you plan to help mentees..."
                      rows={4}
                      value={form.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1"
                      variant="hero"
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
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
