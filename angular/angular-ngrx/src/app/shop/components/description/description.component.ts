import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() description: any;

  constructor() {
    this.description = {
      orderList: `2PCS SA828-VHF Walkie talkie module SA828 is an all-in-one professional walkie-talkie module in small size.
      It is very easy to use with powerful function. This module has full function of a professional walkie-talkie and can talk
      with any analog walkie-talkie in the market. With the small size, it can be easily embedded into instrument, portable
      and handheld device. SA828 works well in the hot/cold environment with the KDS 1PPM TCXO. The features of excellent antenna
      match network, good RF amplifier, high RF sensitivity allow its communication easily to achieve over 3Km in open area.
      Rotary switch for channel selection, EEPROM, Audio Amplifier, RF Amplifier, PTT key, Antenna socket are all included
      in such a small size module. Besides, all parameters (CTCSS, CDCSS, SQ, Predefined channels etc) can be easily modified
      either by PC software or command using UART interface. With the embedded audio volume turning circuit, user can only solder
      a variable resistor on Pin16, Pin17 to adjust the volume steplessly. There are two frequency bands of SA828: SA828-U and SA828-V.
      The only difference is the frequency range. The others are same, including module size, interface, software protocol, etc.
      The two modules’ frequency ranges are: SA828-U: U band, 400 -- 480MHz, SA828-V: V band, 134 -- 174MHz`,
      features: [
        'first feature',
        'first feature',
        'first feature',
        'first feature',
        'first feature',
        'first feature',
        'first feature'
      ],
      applications: [
        'Small size walkie-talkie',
        'pocket handheld device',
        'Security system',
        'Instrument',
        'Outdoor sport product',
        'Audio tracking and control system'
      ]
    };
  }

  ngOnInit(): void {
    //
  }

}
