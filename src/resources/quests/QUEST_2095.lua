QUEST_2095 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001048',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 117,
		max_level = 121,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1672126053,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_DOGTOOTH', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001049',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001050',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001051',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001052',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001053',
		},
	}
}
