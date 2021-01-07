import React, { useEffect, useState } from 'react'

import {
	Box,
	Flex,
	FlexProps,
	Icon,
	IconButton,
	Portal,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
	Stack,
	Text,
	useClipboard,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import { HiLocationMarker } from 'react-icons/hi'
import ReactMapGL, { Marker, InteractiveMapProps } from 'react-map-gl'

import moment from 'moment'
import AccountPageTemplate from './components/account-page-template'

const DEFAULT_MAP_ZOOM = 15

// TODO: finalize model
interface ScanLocation {
	latitude: number
	longitude: number
	nearestAddress: string
	date: string
	deviceInfo: string
}

type LocationScanMapProps = {
	viewport: InteractiveMapProps
	setViewport: (viewport: InteractiveMapProps) => void
	scanLocations: ScanLocation[]
}

const ScanLocationMarker: React.FC<{ scanLocation: ScanLocation }> = ({
	scanLocation,
}) => (
	<Marker
		latitude={scanLocation.latitude}
		longitude={scanLocation.longitude}
		offsetLeft={-15}
		offsetTop={-15}>
		<Icon
			as={HiLocationMarker}
			boxSize="30px"
			color="petcode.yellow.400"
			cursor="pointer"
		/>
		{/*
      <Popover isLazy placement="bottom">
        <PopoverTrigger>
          <Icon
            as={HiLocationMarker}
            boxSize="30px"
            color="petcode.yellow.400"
            cursor="pointer"
          />
        </PopoverTrigger>
        <PopoverContent width="250px" zIndex={4}>
          <PopoverCloseButton />
          <PopoverHeader>
            <Text>
              Scanned{' '}
              {moment
                .duration(moment(scanLocation.date).diff(moment()))
                .humanize(true)}
            </Text>
          </PopoverHeader>
          <PopoverBody>
            <Text>
              <b>Location: </b> {scanLocation.nearestAddress}
            </Text>
            <Text>
              <b>Device Info: </b> {scanLocation.deviceInfo}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover> */}
	</Marker>
)

const LocationScanMap: React.FC<LocationScanMapProps> = ({
	viewport,
	setViewport,
	scanLocations,
}) => (
	<ReactMapGL
		{...viewport}
		mapboxApiAccessToken={process.env.NEXT_PUBLIC_mapboxToken}
		mapStyle="mapbox://styles/mapbox/streets-v11"
		onViewportChange={(newViewport) =>
			setViewport({
				...viewport,
				...newViewport,
				width: '100%',
			})
		}>
		{scanLocations.map((scanLocation, idx) => (
			<ScanLocationMarker key={idx} scanLocation={scanLocation} />
		))}
	</ReactMapGL>
)

const ScanLocationCard: React.FC<
	FlexProps & {
		scanLocation: ScanLocation
	}
> = ({ scanLocation, ...props }) => {
	const { onCopy } = useClipboard(scanLocation.nearestAddress)

	return (
		<Flex
			direction="row"
			alignItems="center"
			fontSize="xl"
			fontWeight="thin"
			paddingX={6}
			paddingY={4}
			cursor="pointer"
			_hover={{
				backgroundColor: 'petcode.neutral.200',
			}}
			layerStyle="card"
			{...props}>
			<Text color="petcode.blue.400">{scanLocation.nearestAddress}</Text>
			<IconButton
				aria-label="Copy address"
				icon={<CopyIcon />}
				size="sm"
				ml={3}
				onClick={onCopy}
			/>
			<Box flexGrow={1} />
			<Text color="petcode.neutral.400" marginRight={2}>
				{moment(scanLocation.date).format('M/D/YY - LT')}
			</Text>
			<Icon as={HiLocationMarker} boxSize="30px" color="petcode.yellow.400" />
		</Flex>
	)
}

const ScanLocations = () => {
	const [scanLocations] = useState(
		() =>
			[
				{
					latitude: 37.3356424,
					longitude: -122.0505069,
					nearestAddress: '21370 Homestead Rd, Cupertino, CA 95014',
					date: '2020-08-09T14:00',
					deviceInfo: 'iPhone / Safari',
				},
				{
					latitude: 37.3400556,
					longitude: -122.0502666,
					nearestAddress: '1628 South Mary Avenue, Sunnyvale, CA 94087',
					date: '2020-08-09T13:00',
					deviceInfo: 'Android / Chrome',
				},
			] as ScanLocation[]
	)
	const [mapViewport, setMapViewport] = useState<InteractiveMapProps>({
		width: '100%',
		height: 400,
		zoom: DEFAULT_MAP_ZOOM,
		latitude: scanLocations[0].latitude,
		longitude: scanLocations[0].longitude,
	})

	return (
		<AccountPageTemplate>
			<Flex
				position="relative"
				direction="column"
				flexGrow={1}
				paddingX={10}
				zIndex={1}>
				<LocationScanMap
					scanLocations={scanLocations}
					viewport={mapViewport}
					setViewport={setMapViewport}
				/>
				<Text color="petcode.neutral.700" fontSize="3xl" marginY={3}>
					Scan Locations
				</Text>
				<Stack spacing={3}>
					{scanLocations.map((scanLocation, idx) => (
						<ScanLocationCard
							key={idx}
							scanLocation={scanLocation}
							onClick={() =>
								setMapViewport({
									...mapViewport,
									latitude: scanLocation.latitude,
									longitude: scanLocation.longitude,
									zoom: DEFAULT_MAP_ZOOM,
								})
							}
						/>
					))}
				</Stack>
			</Flex>
		</AccountPageTemplate>
	)
}

export default ScanLocations
