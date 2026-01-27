import { render, screen } from "@testing-library/react";
import { SupportCard } from "@/components/SupportCard";

describe("SupportCard", () => {
  it("renders nothing when categoryKey is null", () => {
    const { container } = render(<SupportCard categoryKey={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("shows grammar explanation for articles category", () => {
    render(<SupportCard categoryKey="articles" />);

    expect(screen.getByText(/Articles \(a, an, the\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/हिंदी में articles नहीं होते, इसलिए अंग्रेजी में भूल जाते हैं/)
    ).toBeInTheDocument();
  });
});