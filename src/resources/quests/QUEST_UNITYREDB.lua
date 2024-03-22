QUEST_UNITYREDB = {
	title = 'IDS_PROPQUEST_INC_001197',
	character = 'MaDa_Amadolka',
	end_character = 'MaDa_Amadolka',
	start_requirements = {
		min_level = 60,
		max_level = 80,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_LORDBAMBITION',
	},
	rewards = {
		gold = 0,
		exp = 6039776,
	},
	end_conditions = {
		patrols = {
			{ map = 'WI_WORLD_MADRIGAL', left = 5159, top = 3381, right = 5195, bottom = 3359 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001198',
			'IDS_PROPQUEST_INC_001199',
			'IDS_PROPQUEST_INC_001200',
			'IDS_PROPQUEST_INC_001201',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001202',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001203',
		},
		completed = {
			'IDS_PROPQUEST_INC_001204',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001205',
		},
	}
}
