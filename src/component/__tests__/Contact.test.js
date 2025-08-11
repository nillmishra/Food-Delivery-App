import React from "react";
import {render, screen} from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Should load Contact us component", () => {
    render(<Contact />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
});

test("Should load button us component", () => {
    render(<Contact />);
    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toBeInTheDocument();
});
