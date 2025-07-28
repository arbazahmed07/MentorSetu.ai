import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Sparkles, Search, Star, Filter, MapPin, Clock, DollarSign } from "lucide-react";
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
  };

  const categories = Array.from(
    new Set(mentors.flatMap(mentor => mentor.expertise))
  ).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MentorSetu.ai
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/become-mentor">
              <Button variant="ghost">Become a Mentor</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Find Your Perfect Mentor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our curated list of industry experts and accelerate your career growth
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-card border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search mentors, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
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
                <SelectTrigger className="w-32">
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
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="100">Under $100</SelectItem>
                  <SelectItem value="150">Under $150</SelectItem>
                  <SelectItem value="200">Under $200</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredMentors.length} Mentors Found
            </h2>
          </div>

          {filteredMentors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No mentors found matching your criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-medium transition-all duration-300 border bg-gradient-card">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover shadow-soft"
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({mentor.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {mentor.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${mentor.price}/session</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>~{mentor.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link to={`/mentor/${mentor.id}`} className="w-full">
                      <Button className="w-full" variant="cta">
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