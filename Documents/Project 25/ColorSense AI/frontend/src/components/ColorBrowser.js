import React, { useState, useEffect, useCallback } from "react";
import "./ColorBrowser.css";

const ColorBrowser = () => {
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    family: "all",
    collection: "all",
    undertone: "",
    style: "",
    lighting: "",
    room: "",
  });
  const [selectedColor, setSelectedColor] = useState(null);

  const getBenjaminMooreUrl = (colorCode) => {
    // Convert color code to URL format (e.g., "2121-70" -> "2121-70")
    const formattedCode = colorCode.replace(/\s+/g, "");
    return `https://www.benjaminmoore.com/en-us/paint-colors/color/${formattedCode}`;
  };

  const handleColorClick = (color) => {
    setSelectedColor(selectedColor === color.code ? null : color.code);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterColors = useCallback(() => {
    const filtered = colors.filter((color) => {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        color.name.toLowerCase().includes(searchTerm) ||
        color.code.toLowerCase().includes(searchTerm) ||
        color.family.toLowerCase().includes(searchTerm) ||
        color.collection.toLowerCase().includes(searchTerm) ||
        color.undertone.toLowerCase().includes(searchTerm) ||
        color.description.toLowerCase().includes(searchTerm) ||
        (Array.isArray(color.suggestedRooms) &&
          color.suggestedRooms.some((room) =>
            room.toLowerCase().includes(searchTerm)
          )) ||
        (Array.isArray(color.style) &&
          color.style.some((style) =>
            style.toLowerCase().includes(searchTerm)
          ));

      const matchesFamily =
        filters.family === "all" || color.family === filters.family;
      const matchesCollection =
        filters.collection === "all" || color.collection === filters.collection;
      const matchesUndertone =
        !filters.undertone || color.undertone === filters.undertone;
      const matchesStyle =
        !filters.style ||
        (Array.isArray(color.style) && color.style.includes(filters.style));
      const matchesLighting =
        !filters.lighting ||
        (Array.isArray(color.lighting) &&
          color.lighting.includes(filters.lighting));
      const matchesRoom =
        !filters.room ||
        (Array.isArray(color.suggestedRooms) &&
          color.suggestedRooms.includes(filters.room));

      return (
        matchesSearch &&
        matchesFamily &&
        matchesCollection &&
        matchesUndertone &&
        matchesStyle &&
        matchesLighting &&
        matchesRoom
      );
    });
    setFilteredColors(filtered);
  }, [colors, filters]);

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    filterColors();
  }, [filterColors]);

  const fetchColors = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/colors");
      const data = await response.json();
      setColors(data.data);
      setFilteredColors(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colors:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading colors...</div>;
  }

  return (
    <div className="color-browser">
      <div className="color-browser-header">
        <input
          type="text"
          name="search"
          placeholder="Search colors..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />

        <select
          name="family"
          value={filters.family}
          onChange={handleFilterChange}
        >
          <option value="all">All Families</option>
          <option value="White">White</option>
          <option value="Neutral">Neutral</option>
          <option value="Gray">Gray</option>
          <option value="Yellow">Yellow</option>
          <option value="Orange">Orange</option>
          <option value="Red">Red</option>
          <option value="Purple">Purple</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
        </select>

        <select
          name="collection"
          value={filters.collection}
          onChange={handleFilterChange}
        >
          <option value="all">All Collections</option>
          <option value="Color Preview">Color Preview</option>
          <option value="Benjamin Moore Classics">
            Benjamin Moore Classics
          </option>
          <option value="Historical Color Collection">
            Historical Color Collection
          </option>
          <option value="Off White Collection">Off White Collection</option>
          <option value="Affinity Color Collection">
            Affinity Color Collection
          </option>
          <option value="Color Stories">Color Stories</option>
          <option value="Williamsburg Color Collection">
            Williamsburg Color Collection
          </option>
          <option value="Designer Classics Collection">
            Designer Classics Collection
          </option>
        </select>

        <select
          name="undertone"
          value={filters.undertone}
          onChange={handleFilterChange}
        >
          <option value="">All Undertones</option>
          <option value="Warm">Warm</option>
          <option value="Cool">Cool</option>
          <option value="Neutral">Neutral</option>
        </select>

        <select
          name="style"
          value={filters.style}
          onChange={handleFilterChange}
        >
          <option value="">All Styles</option>
          <option value="Art Deco">Art Deco</option>
          <option value="Boho">Boho</option>
          <option value="Casual Coastal">Casual Coastal</option>
          <option value="Contemporary">Contemporary</option>
          <option value="Cottage">Cottage</option>
          <option value="Cozy Cabin">Cozy Cabin</option>
          <option value="Craftsman">Craftsman</option>
          <option value="Dark Glamour">Dark Glamour</option>
          <option value="Eclectic Vintage">Eclectic Vintage</option>
          <option value="English Heritage">English Heritage</option>
          <option value="French Country">French Country</option>
          <option value="Hygge">Hygge</option>
          <option value="Maximalism">Maximalism</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Midcentury Modern">Midcentury Modern</option>
          <option value="Minimalist">Minimalist</option>
          <option value="Modern Farmhouse">Modern Farmhouse</option>
          <option value="Retro Style">Retro Style</option>
          <option value="Tropical">Tropical</option>
        </select>

        <select
          name="lighting"
          value={filters.lighting}
          onChange={handleFilterChange}
        >
          <option value="">All Lighting</option>
          <option value="North-Facing">North-Facing</option>
          <option value="South-Facing">South-Facing</option>
          <option value="East-Facing">East-Facing</option>
          <option value="West-Facing">West-Facing</option>
        </select>

        <select name="room" value={filters.room} onChange={handleFilterChange}>
          <option value="">All Rooms</option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Dining Room">Dining Room</option>
          <option value="Home Office">Home Office</option>
          <option value="Entryway">Entryway</option>
          <option value="Exterior">Exterior</option>
        </select>
      </div>

      <div className="color-grid">
        {filteredColors.map((color) => (
          <div
            key={color.code}
            className="color-card"
            style={{
              backgroundColor:
                selectedColor === color.code ? color.hex : "white",
              color:
                selectedColor === color.code
                  ? getTextColor(color.hex)
                  : "inherit",
            }}
          >
            <div
              className="color-swatch"
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorClick(color)}
            />
            <div className="color-info">
              <h3>{color.name}</h3>
              <a
                href={getBenjaminMooreUrl(color.code)}
                target="_blank"
                rel="noopener noreferrer"
                className="color-code"
              >
                {color.code}
              </a>
              <p className="color-family">{color.family}</p>
              <p className="color-description">{color.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine text color based on background color
const getTextColor = (hexColor) => {
  // Remove the # if present
  const hex = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export default ColorBrowser;
