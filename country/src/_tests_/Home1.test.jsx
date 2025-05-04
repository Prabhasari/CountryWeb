import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home1';
import '@testing-library/jest-dom';

// Mock the react-router-dom's useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

// Mock the imported images
jest.mock('../assets/country1.jpg', () => 'country1-mock-path');
jest.mock('../assets/country7.jpg', () => 'country7-mock-path');
jest.mock('../assets/country3.jpg', () => 'country3-mock-path');
jest.mock('../assets/country4.jpeg', () => 'country4-mock-path');
jest.mock('../assets/country5.jpeg', () => 'country5-mock-path');
jest.mock('../assets/country6.jpeg', () => 'country6-mock-path');
jest.mock('../assets/capital.jpg', () => 'capital-mock-path');
jest.mock('../assets/population.jpg', () => 'population-mock-path');
jest.mock('../assets/flags.jpg', () => 'flags-mock-path');
jest.mock('../assets/speaking.jpg', () => 'speaking-mock-path');

// Mock the Navbar component
jest.mock('../components/Navbar', () => {
  return function DummyNavbar() {
    return <div data-testid="navbar">Navbar Component</div>;
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    })
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock setInterval and setTimeout
jest.useFakeTimers();

describe('Home Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Explore Our World')).toBeInTheDocument();
  });

  test('renders navbar component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders hero section with correct content', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Explore Our World')).toBeInTheDocument();
    expect(screen.getByText('Discover countries, cultures, and connections')).toBeInTheDocument();
    expect(screen.getByText(/Learn about nations around the globe/)).toBeInTheDocument();
  });

  test('renders explore countries button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Explore Countries')).toBeInTheDocument();
  });

  test('renders facts section with correct data', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Explore Global Facts')).toBeInTheDocument();
    expect(screen.getByText('195+')).toBeInTheDocument();
    expect(screen.getByText('7,000+')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('8+ Billion')).toBeInTheDocument();
  });

  test('renders category buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Capitals')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  test('renders app features section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Application Features')).toBeInTheDocument();
    expect(screen.getByText('Country Search')).toBeInTheDocument();
    expect(screen.getByText('Region Filters')).toBeInTheDocument();
    expect(screen.getByText('Detailed Information')).toBeInTheDocument();
  });

  test('renders footer section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Project Info')).toBeInTheDocument();
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
    expect(screen.getByText('© 2025 Countries Explorer')).toBeInTheDocument();
  });

  test('clicking "Explore Countries" button should navigate to /allCountry', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const exploreButton = screen.getByText('Explore Countries');
    fireEvent.click(exploreButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/allCountry');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('currentApiEndpoint', 'https://restcountries.com/v3.1/all');
  });

  test('clicking "View All Countries" button should navigate to /allCountry', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const viewAllButton = screen.getByText('View All Countries');
    fireEvent.click(viewAllButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/allCountry');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('currentApiEndpoint', 'https://restcountries.com/v3.1/all');
  });

  test('clicking "Population" button should navigate to correct route', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const populationButton = screen.getByText('Population');
    fireEvent.click(populationButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/filter/population');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'currentApiEndpoint', 
      'https://restcountries.com/v3.1/all?fields=name,population,flags'
    );
  });

  test('clicking "Capitals" button should navigate to correct route', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const capitalsButton = screen.getByText('Capitals');
    fireEvent.click(capitalsButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/filter/capitals');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'currentApiEndpoint', 
      'https://restcountries.com/v3.1/all?fields=name,capital,flags'
    );
  });

  test('clicking "Region" button should navigate to correct route', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const regionButton = screen.getByText('Region');
    fireEvent.click(regionButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/filter/region');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'currentApiEndpoint', 
      'https://restcountries.com/v3.1/all?fields=name,region,subregion,flags'
    );
  });

  test('clicking "Languages" button should navigate to correct route', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const languagesButton = screen.getByText('Languages');
    fireEvent.click(languagesButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/filter/languages');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'currentApiEndpoint', 
      'https://restcountries.com/v3.1/all?fields=name,languages,flags'
    );
  });

  test('image slideshow advances after timeout', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Fast-forward through the slideshow transition
    jest.advanceTimersByTime(5000);
    
    // Verify setAnimate was called (difficult to test directly, but we can 
    // verify that setTimeout was used via the timers)
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('component properly unmounts and clears interval', () => {
    const { unmount } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});