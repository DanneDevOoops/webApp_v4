// nominatim-models.test.ts
import { getCoordinates } from 'models/nominatim-models';
import { CoordinatesResponse } from 'interfaces/utils-interfaces';
import {
    describe,
    expect,
    it,
    beforeEach,
    afterEach,
    jest,
} from '@jest/globals';

describe('getCoordinates', () => {
    beforeEach(() => {
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
        jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockClear();
    });

    it('should fetch coordinates for a given address', async () => {
        const mockResponse: CoordinatesResponse[] = [
            { lat: '40.712776', lon: '-74.005974' },
        ];
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const address = 'New York';
        const result = await getCoordinates(address);

        expect(fetch).toHaveBeenCalledWith(
            'https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=New%20York',
        );
        expect(result).toEqual(mockResponse);
    });

    it('should return undefined and log an error if fetch fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const address = 'Invalid Address';
        const result = await getCoordinates(address);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith(
            '<?> getCoordinates -> ERROR: ',
            new Error('Network error'),
        );

        consoleSpy.mockRestore();
    });
});
