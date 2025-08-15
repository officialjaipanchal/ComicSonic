#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting MigrateMate Cancellation Flow...${NC}"

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
}

# Function to wait for a service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}⏳ Waiting for $service_name to be ready...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is ready!${NC}"
            return 0
        fi
        
        echo -e "${YELLOW}   Attempt $attempt/$max_attempts - $service_name not ready yet...${NC}"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ $service_name failed to start within expected time${NC}"
    return 1
}

# Check if Supabase is already running
if check_port 54321; then
    echo -e "${YELLOW}⚠️  Supabase API is already running on port 54321${NC}"
else
    echo -e "${BLUE}📦 Starting Supabase...${NC}"
    supabase start > /dev/null 2>&1 &
    SUPABASE_PID=$!
    
    # Wait for Supabase to be ready
    if ! wait_for_service "http://127.0.0.1:54321" "Supabase API"; then
        echo -e "${RED}❌ Failed to start Supabase${NC}"
        exit 1
    fi
fi

# Check if Next.js is already running
if check_port 3000; then
    echo -e "${YELLOW}⚠️  Next.js is already running on port 3000${NC}"
else
    echo -e "${BLUE}⚡ Starting Next.js application...${NC}"
    npm run dev > /dev/null 2>&1 &
    NEXTJS_PID=$!
    
    # Wait for Next.js to be ready
    if ! wait_for_service "http://localhost:3000" "Next.js"; then
        echo -e "${RED}❌ Failed to start Next.js${NC}"
        exit 1
    fi
fi

# Display final status
echo -e "${GREEN}🎉 All services are running!${NC}"
echo -e "${BLUE}📱 Application: ${GREEN}http://localhost:3000${NC}"
echo -e "${BLUE}📊 Supabase Studio: ${GREEN}http://127.0.0.1:54323${NC}"
echo -e "${BLUE}🔌 API: ${GREEN}http://127.0.0.1:54321${NC}"
echo ""
echo -e "${YELLOW}💡 Press Ctrl+C to stop all services${NC}"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping services...${NC}"
    
    # Kill background processes
    if [ ! -z "$SUPABASE_PID" ]; then
        kill $SUPABASE_PID 2>/dev/null
    fi
    if [ ! -z "$NEXTJS_PID" ]; then
        kill $NEXTJS_PID 2>/dev/null
    fi
    
    # Kill any remaining processes
    pkill -f "next dev" 2>/dev/null
    pkill -f "supabase" 2>/dev/null
    
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
echo -e "${BLUE}🔄 Services are running. Press Ctrl+C to stop...${NC}"
while true; do
    sleep 1
done
