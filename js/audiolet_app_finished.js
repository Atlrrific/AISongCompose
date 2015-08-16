function playExample() {
    var Synth = function(audiolet, frequency) {
        AudioletGroup.apply(this, [audiolet, 0, 1]);
        this.sine = new Sine(this.audiolet, frequency);
        this.modulator = new Saw(this.audiolet, frequency * 2);
        this.modulatorMulAdd = new MulAdd(this.audiolet, frequency / 2,
                                          frequency);

        this.gain = new Gain(this.audiolet);
        this.envelope = new PercussiveEnvelope(this.audiolet, 1, 0.2, 0.5,
            function() {
                this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
            }.bind(this)
        );

        this.modulator.connect(this.modulatorMulAdd);
        this.modulatorMulAdd.connect(this.sine);

        this.envelope.connect(this.gain, 0, 1);
        this.sine.connect(this.gain);

        this.gain.connect(this.outputs[0]);
    };
    extend(Synth, AudioletGroup);

    var AudioletApp = function() {
        this.audiolet = new Audiolet();

        // var melodyA = new PSequence([725, 800, 725, 800, 810, 725, 725, 800, 725, 725, 800, 810]);
        var melodyA = new PSequence([0, 0, 237, 726, 0, 0, 0, 0, 237, 726, 800, 0, 237, 726, 800, 0, 0, 237, 726, 800, 811, 0, 237, 0, 237, 0, 237, 726, 800, 811, 0, 237, 0, 0, 0, 237, 0, 237, 726, 0, 0, 237, 0, 0, 0, 0, 237, -1563, 237, 0, 0, 237, 726, 0, 0, 237, 0, 237, 0, 237, 0, 0, 237, 0, 237, 0, 237, 726, 0, 237, 726, 0, 0, 0, 0, 0, 0, 237, 726, 800, 0, 237, 726, 0, 0, 237, 0, 0, 0, 0, 237, 0, 0, 237, 0, 0, 237, 726, 800, 811, 0, 0, 0, 0, 0, 0, 237, 0, 0, 0, 237, 726, 800, 0, 237, 726, 0, 237, -1615, 237, 0, 0, 237, 0, 237, 0, 0, 237, 726, 0, 0, 237, 0, 0, 237, 0, 0, 0, 237, 0, 0, 237, 726, 800, 811, 0, 237, 0, 237, 0, 237, 726, 0, 237, 0, 0, 0, 237, 0, 237, 0, 237, 0, 0, 0, 237, 726, 800, 811, 0, 0, 237, 726, 0, 237, 0, 0, 0, 0, 0, 237, 0, 0, 237, 0, 0, 237, 0, 237, 0, 0, 237, 726, 0, 237, -116, 0, 0, 237, 726, 0, 237, 726, 800, 0, 237, 0, 0, 237, 0, 0, 237, 726, 0, 0, 237, 0, 237, 726, 0, 0, 0, 0, 0, 237, 0, 0, 237, 0, 0, 237, 0, 237, 0, 0, 237, 0, 0, 0, 237, 0, 0, 0, 0, 0, 237, 726, 800, 0, 237, 0, 0, 0, 237, 0, 0, 0, 0, 237, 726, 0, 237, 0, 237, 726, 0, 0, 0, 237, 726, 0, 237, 726, 800, -2112, 0, 0, 0, 0, 237, 0, 0, 237, 726, 800, 811, 0, 237, 726, 0, 0, 0, 237, 0, 0, 0, 237, 726, 0, 237, 726, 800, 0, 237, -636, 0, 237, 726, 0, 0, 0, 237, 0, 0, 237, 0, 237, 726, 0, 237, -1616, 237, 0, 0, 237, 726, 0, 0, 0, 237, 726, 0, 237, 726, 0, 237, 0, 237, 0, 237, 0, 237, 726, 0, 237, 726, 800, 0, 237, 0, 0, 237, 726, 0, 237, 726, 0, 237, 726, 0, 0, 237, 726, 0, 0, 0, 0, 237, 0, 237, 726, 800, 0, 237, 726, 800, 811, 812, 812, 812, 0, 237, 0, 0, 0, 0, 0, 0, 0, 0, 0, 237, 726, 0, 237, 0, 0, 0, 0, 0, 237, 726, 800, 811, 812, 812, 0, 0, 237, 726, 800, 0, 0, 0, 0, 237, -1616, 576, 0, 0, 0, 0, 237, 0, 237, 726, 0, 237, 0, 237, 0, 237, 726, 800, 0, 237, 0, 237, 0, 0, 237, 0, 0, 0, 0, 0, 237, 726, 800, 0, 0, 0, 237, 0, 237, 0, 0, 0, 237, 726, -2046, 237, 0, 0, 0, 0, 0, 237, 726, 0, 237, 726, 800, 811, 0, 237, 0, 0, 237, 726, 0, 0, 237, 726, 800, 0, 237, 726, 800, 811, 812, 812, 0, 237, 0, 0, 237, 0, 237, 726, 0, 0, 0, 0, 237, 726, 0, 0, 0, 237, 726, 800, 0, 237, 726, 0, 237, 726, 800, 811, 812, 0, 0, 237, 0, 0, 237, 726, 0, 237, 726, 0, 0, 237, 726, 800, 811, 0, 0, 237, 0, 237, 0, 0, 0, 0, 0, 0, 237, 0, 0, 0, 0, 237, 726, 800, 0, 0, 237, 0, 237, 0, 0, 0, 0, 237, 0, 0, 237, 726, 800, 811, 0, 0, 237, 0, 237, 726, 0, 0, 0, 0, 237, 726, 0, 237, 0, 237, 726, 0, 237, 0, 237, 0, 237, 0, 0, 237, 0, 0, 237, 726, 0, 0, 237, 726, 0, 0, 237, 0, 0, 0, 237, 726, 0, 237, 726, 0, 0, 237, 0, 0, 0, 0, 237, 0, 237, -1616, 303, 737, 0, 0, 0, 237, 726, 800, 0, 237, 726, 0, 0, 0, 0, 0, 0, 237, 0, 0, 0, 0, 237, 726, 800, 0, 0, 0, 237, 726, 800, 0, 237, 726, 0, 0, 0, 0, 237, 726, 0, 237, 726, 800, -2112, 237, 0, 0, 0, 0, 237, 726, 800, 811, 0, 0, 237, 726, 800, 811, 812, 812, 812, 812, 0, 237, 0, 0, 237, -1615, 0, 0, 0, 237, 726, 800, 0, 237, 726, 800, 0, 0, 237, 0, 0, 237, 0, 237, 726, 800, 811, 812, 0, 0, 0, 0, 0, 237, 0, 237, 726, 800, 0, 237, 0, 0, 237, 0, 0, 0, 237, 0, 0, 0, 0, 237, 0, 0, 0, 0, 0, 237, 0, 0, 237, 0, 0, 0, 237, 0, 237, 0, 0, 0, 237, 726, 0, 0, 0, 0, 0, 237, 0, 237, 726, 0, 0, 237, 726, 0, 0, 0, 237, 0, 0, 237, 0, 237, 0, 237, 0, 237, 0, 0, 0, 237, 726, 0, 0, 237, 0, 237, 0, 0, 0, 237, 726, 800, 0, 237, 0, 237, 726, 0, 0, 0, 0, 0, 0, 0, 237, 726, 800, 0, 237, 726, 0, 0, 0, 237, 726, 0, 0, 237, 0, 237, 0, 0, 0, 237, 726, 0, 237, 0, 0, 237, 726, 0, 0, 0, 0, 237, 0, 237, 0, 237, 0, 237, 0, 237, 726, 800, 811, 812, 0, 0, 237, 726, 800, 0, 237, 726, 0, 0, 237, 726, 800, 0, 0, 0, 237, 0, 237, 726, 800, 0, 237, 726, 800, 0, 237, 0, 237, 726, 0, 0, 237, 726, 800, 0, 0, 237, 0, 237, 726, 800, 0, 237, 0, 0, 0, 0, 237, 0, 237, 726, 0, 0, 237, 0, 0, 237, 0, 0, 0, 0, 0, 237, 726, 800, 0, 237, 0, 237, 0, 0, 237, 0, 237, 0, 0, 0, 0, 0, 0, 237, 0, 237, 726, 0, 0, 0, 237, 726, 0, 0, 0, 0, 237, 726, 0, 0, 0, 0, 0, 0, 0, 237, 726, 800, 0, 237, 0, 0, 0, 0, 0, 237, 0, 237, 726, 800, 0, 237, 0, 0, 237, 0, 237, 0, 237, 0, 237, 726, 0, 237, 0, 0, 237, 726, 0, 0]);
        var melodyB = new PSequence([349, 330, 349, 392]);
        var melodyC = new PSequence([440, 392, 349, 330]);
        var frequencyPattern = new PChoose([melodyA],
                                           Infinity);

        var durationPattern = new PChoose([new PSequence([4/10, 1/10, 1/10, 2/10]),
                                           new PSequence([2/10, 2/10, 1/10, 3/10]),
                                           new PSequence([1/10, 1/10, 1/10, 1/10])],
                                          Infinity);

        this.audiolet.scheduler.play([frequencyPattern], durationPattern,
            function(frequency) {
                var synth = new Synth(this.audiolet, frequency);
                synth.connect(this.audiolet.output);
            }.bind(this)
        );
    };

    this.audioletApp = new AudioletApp();
};

function playExample2() {
    var Synth = function(audiolet, frequency) {
        AudioletGroup.apply(this, [audiolet, 0, 1]);
        this.sine = new Sine(this.audiolet, frequency);
        this.modulator = new Saw(this.audiolet, frequency * 2);
        this.modulatorMulAdd = new MulAdd(this.audiolet, frequency / 2,
                                          frequency);

        this.gain = new Gain(this.audiolet);
        this.envelope = new PercussiveEnvelope(this.audiolet, 1, 0.2, 0.5,
            function() {
                this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
            }.bind(this)
        );

        this.modulator.connect(this.modulatorMulAdd);
        this.modulatorMulAdd.connect(this.sine);

        this.envelope.connect(this.gain, 0, 1);
        this.sine.connect(this.gain);

        this.gain.connect(this.outputs[0]);
    };
    extend(Synth, AudioletGroup);

    var AudioletApp = function() {
        this.audiolet = new Audiolet();

        // var melodyA = new PSequence([725, 800, 725, 800, 810, 725, 725, 800, 725, 725, 800, 810]);
        var melodyA = new PSequence([1100, 1548, 0, 0, 1100, 1548, 1616, 1626, 0, 0, 0, 1100, 0, 0, 0, 1100, 1548, 0, 0, 0, 0, 1100, 0, 1100, 0, 1100, 0, 0, 0, 0, 1100, 0, 1100, 1548, 1616, 0, 1100, 0, 0, 1100, 1548, 0, 1100, 1548, 1616, 1626, 215, 215, 0, 1100, 1548, 215, 0, 1100, 1548, 0, 1100, 0, 1100, 0, 1100, 1548, 0, 1100, 0, 1100, 0, 0, 1100, 0, 0, 1100, 1548, 1616, 1626, 1627, 1627, 0, 0, 0, 1100, 0, 0, 1100, 1548, 0, 1100, 1548, 2099, 1626, 0, 1100, 1548, 0, 1100, 1548, 0, 0, 0, 0, 1100, 1548, 1616, 1626, 1627, 1627, 0, 1100, 1548, 1616, 0, 0, 0, 1100, 0, 0, 1100, 0, 1100, 0, 1100, 1983, 650, 215, 0, 1100, 1548, 0, 0, 1100, 1661, 0, 1100, 1548, 0, 1100, 1548, 1616, 0, 1100, 1548, 0, 0, 0, 0, 1100, 0, 1100, 0, 1100, 0, 0, 1100, 0, 1100, 1548, 1616, 0, 1100, 0, 1100, 0, 1100, 1548, 1616, 0, 0, 0, 0, 1100, 1548, 0, 0, 1100, 0, 1100, 1548, 1616, 1626, 1627, 0, 1100, 1548, 0, 1100, 1548, 0, 1100, 0, 1100, 1548, 0, 0, 1100, 0, 1100, 2030, 1616, 0, 0, 1100, 0, 0, 0, 1100, 0, 1100, 1548, 0, 1100, 1548, 0, 214, 1100, 1548, 215, 215, 0, 0, 1100, 1548, 1616, 1626, 1627, 0, 1100, 1548, 0, 1100, 1548, 0, 1100, 0, 1100, 1548, 0, 1100, 1548, 1616, 0, 1100, 1548, 1616, 1626, 1627, 0, 0, 0, 1100, 0, 1100, 1548, 1616, 0, 1100, 1548, 1616, 1626, 0, 0, 1100, 0, 1100, 0, 0, 1100, 1548, 1616, 0, 0, 1100, 0, 0, 0, 1100, 2030, 1616, 1626, 1627, 0, 1100, 1548, 0, 0, 0, 0, 1100, 215, 0, 1100, 1548, 1616, 0, 1100, 1548, 1616, 0, 0, 1100, 0]);
        var melodyB = new PSequence([349, 330, 349, 392]);
        var melodyC = new PSequence([440, 392, 349, 330]);
        var frequencyPattern = new PChoose([melodyA],
                                           Infinity);

        var durationPattern = new PChoose([new PSequence([4/10, 1/10, 1/10, 2/10]),
                                           new PSequence([2/10, 2/10, 1/10, 3/10]),
                                           new PSequence([1/10, 1/10, 1/10, 1/10])],
                                          Infinity);

        this.audiolet.scheduler.play([frequencyPattern], durationPattern,
            function(frequency) {
                var synth = new Synth(this.audiolet, frequency);
                synth.connect(this.audiolet.output);
            }.bind(this)
        );
    };

    this.audioletApp = new AudioletApp();
};

function playExample3() {
    var Synth = function(audiolet, frequency) {
        AudioletGroup.apply(this, [audiolet, 0, 1]);
        this.sine = new Sine(this.audiolet, frequency);
        this.modulator = new Saw(this.audiolet, frequency * 2);
        this.modulatorMulAdd = new MulAdd(this.audiolet, frequency / 2,
                                          frequency);

        this.gain = new Gain(this.audiolet);
        this.envelope = new PercussiveEnvelope(this.audiolet, 1, 0.2, 0.5,
            function() {
                this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
            }.bind(this)
        );

        this.modulator.connect(this.modulatorMulAdd);
        this.modulatorMulAdd.connect(this.sine);

        this.envelope.connect(this.gain, 0, 1);
        this.sine.connect(this.gain);

        this.gain.connect(this.outputs[0]);
    };
    extend(Synth, AudioletGroup);

    var AudioletApp = function() {
        this.audiolet = new Audiolet();

        // var melodyA = new PSequence([725, 800, 725, 800, 810, 725, 725, 800, 725, 725, 800, 810]);
        var melodyA = new PSequence([132, 592, 237, 237, 132, 592, 663, 672, 237, 237, 237, 132, 237, 237, 237, 132, 592, 237, 237, 237, 237, 132, 237, 132, 237, 132, 237, 237, 237, 237, 132, 237, 132, 592, 663, 237, 132, 237, 237, 132, 592, 237, 132, 592, 663, 672, 237, 132, 237, 132, 592, 237, 237, 132, 592, 237, 132, 237, 132, 237, 132, 592, 237, 132, 237, 132, 237, 237, 132, 237, 237, 132, 592, 663, 672, 674, 674, 237, 237, 237, 132, 237, 237, 132, 592, 237, 132, 592, 1701, 672, 237, 132, 592, 237, 132, 592, 237, 237, 237, 237, 132, 592, 663, 672, 674, 674, 237, 132, 592, 663, 237, 237, 237, 132, 237, 237, 132, 237, 132, 237, 132, 592, 2118, 663, 237, 132, 592, 237, 237, 132, 592, 237, 132, 592, 237, 132, 592, 663, 237, 132, 592, 237, 237, 237, 237, 132, 237, 132, 237, 132, 237, 237, 132, 237, 132, 592, 663, 237, 132, 237, 132, 237, 132, 592, 663, 237, 237, 237, 237, 132, 592, 237, 237, 132, 237, 132, 592, 663, 672, 674, 237, 132, 592, 237, 132, 592, 237, 132, 237, 132, 592, 237, 237, 132, 237, 132, 1630, 663, 237, 237, 132, 237, 237, 237, 132, 237, 132, 592, 237, 132, 592, 237, 722, 132, 592, 237, 132, 237, 237, 132, 592, 663, 672, 674, 237, 132, 592, 237, 132, 592, 237, 132, 237, 132, 592, 237, 132, 592, 663, 237, 132, 592, 663, 672, 674, 237, 242, 237, 132, 237, 132, 592, 663, 237, 132, 592, 663, 672, 237, 237, 132, 237, 132, 237, 237, 132, 592, 663, 237, 237, 132, 237, 237, 237, 132, 1630, 663, 672, 674, 237, 132, 592, 237, 237, 237, 237, 132, 237, 237, 132, 592, 663, 237, 132, 592, 663, 237, 237, 132, 237]);
        var melodyB = new PSequence([349, 330, 349, 392]);
        var melodyC = new PSequence([440, 392, 349, 330]);
        var frequencyPattern = new PChoose([melodyA],
                                           Infinity);

        var durationPattern = new PChoose([new PSequence([4/10, 1/10, 1/10, 2/10]),
                                           new PSequence([2/10, 2/10, 1/10, 3/10]),
                                           new PSequence([1/10, 1/10, 1/10, 1/10])],
                                          Infinity);

        this.audiolet.scheduler.play([frequencyPattern], durationPattern,
            function(frequency) {
                var synth = new Synth(this.audiolet, frequency);
                synth.connect(this.audiolet.output);
            }.bind(this)
        );
    };

    this.audioletApp = new AudioletApp();
};