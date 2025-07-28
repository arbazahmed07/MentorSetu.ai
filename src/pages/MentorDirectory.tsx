import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Sparkles, Search, Star, Filter, MapPin, Clock, DollarSign, Menu, X } from "lucide-react";
import { api } from "@/utils/api";
import { type Mentor } from "@/data/mentors";

const MentorDirectory = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadMentors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [mentors, searchQuery, categoryFilter, ratingFilter, priceFilter]);

  const loadMentors = async () => {
    try {
      const data = await api.getMentors();
      setMentors(data);
      setFilteredMentors(data);
    } catch (error) {
      console.error("Failed to load mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...mentors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.bio.toLowerCase().includes(query) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(query))
      );
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(mentor =>
        mentor.expertise.some(exp =>
          exp.toLowerCase().includes(categoryFilter.toLowerCase())
        )
      );
    }

    if (ratingFilter && ratingFilter !== "all") {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(mentor => mentor.rating >= minRating);
    }

    if (priceFilter && priceFilter !== "all") {
      const maxPrice = parseInt(priceFilter);
      filtered = filtered.filter(mentor => mentor.price <= maxPrice);
    }

    setFilteredMentors(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setRatingFilter("all");
    setPriceFilter("all");
    setShowMobileFilters(false);
  };

  const categories = Array.from(
    new Set(mentors.flatMap(mentor => mentor.expertise))
  ).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading mentors...</p>
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/become-mentor">
              <Button variant="ghost" size="sm">Become a Mentor</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-3 space-y-2">
              <Link to="/become-mentor" className="block">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  Become a Mentor
                </Button>
              </Link>
              <Link to="/dashboard" className="block">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-hero bg-clip-text text-transparent px-4">
            Find Your Perfect Mentor
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Browse our curated list of industry experts and accelerate your career growth
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-card border-b">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-4 lg:mb-0 lg:mx-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search mentors, skills, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex justify-center lg:hidden mt-4">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filter Controls */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block mt-4 lg:mt-6`}>
            <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="100">Under $100</SelectItem>
                    <SelectItem value="150">Under $150</SelectItem>
                    <SelectItem value="200">Under $200</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Filter className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
              {filteredMentors.length} Mentor{filteredMentors.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {filteredMentors.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                No mentors found matching your criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-medium transition-all duration-300 border bg-gradient-card flex flex-col">
                  <CardHeader className="space-y-3 sm:space-y-4 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-16 h-16 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover shadow-soft flex-shrink-0"
                      />
                      <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                        <h3 className="font-semibold text-base lg:text-lg truncate">{mentor.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{mentor.company}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">{mentor.rating}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            ({mentor.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 sm:space-y-4 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
                      {mentor.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                      {mentor.expertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs px-2 py-1">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{mentor.expertise.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span>${mentor.price}/session</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span>~{mentor.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 flex-shrink-0">
                    <Link to={`/mentor/${mentor.id}`} className="w-full">
                      <Button className="w-full text-sm" variant="cta" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MentorDirectory;