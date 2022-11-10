import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";

import App from "./App";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

const getAutoSuggestions = (word) => {
  const response = fetch(`${API_URL}${word}`)
    .then((res) => res.json())
    .then((res) => res.filter((r) => new RegExp(`${word}`, "i").test(r.name)));
  return response;
};

describe("<App />", () => {
  it("Checking all elements...", () => {
    render(<App />);
    const label = screen.getByTestId("label");
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Äll componments are working properly...", async () => {
    const { getByTestId } = render(<App />);

    const input = screen.getByTestId("input");
    expect(input).toHaveValue("");

    act(() => {
      fireEvent.change(input, {
        target: { value: "sydney" },
      });
    });
    expect(input).toHaveValue("sydney");

    await act(async () => {
      const auto_suggestions = await getAutoSuggestions("sydney");
      expect(auto_suggestions).toHaveLength(13);
    });
  });
});
