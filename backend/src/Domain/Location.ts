/**
 * Location: a way to localize on planet earth, like GPS coordinates for example.
 */
export class Location {

    constructor(public readonly lat: number, public readonly long: number, public readonly alt = 0) {

    }

    private static areNumberEqual(x: number, y: number): boolean {
        return Math.abs(x - y) < Number.EPSILON;
    }


    public static equal(left: Location, right: Location): boolean {
        return Location.areNumberEqual(left.lat, right.lat)
            && Location.areNumberEqual(left.long, right.long)
            && Location.areNumberEqual(left.alt, right.alt);
    }
}