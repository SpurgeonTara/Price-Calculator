class PriceCalculator {
  constructor() {
    this.euroToCents = 100;
  }

  eurosToCents(euros) {
    return euros * this.euroToCents;
  }

  centsToEuros(cents) {
    return cents / this.euroToCents;
  }

  calculateTotalPrice(
    total_distance,
    base_distance_in_km,
    km_price,
    fix_price,
    item_type,
  ) {
    const [km_price_for_perishable, km_price_for_non_perishable] = km_price.split('/');

    let additionalPrice = 0;
    if (total_distance > base_distance_in_km) {
      const additionalDistance = total_distance - base_distance_in_km;
      additionalPrice = item_type === 'perishable'
        ? km_price_for_perishable * additionalDistance
        : km_price_for_non_perishable * additionalDistance;
    }

    const total_price = fix_price + additionalPrice;

    return this.eurosToCents(total_price);
  }
}

export default PriceCalculator;
