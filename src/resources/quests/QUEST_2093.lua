QUEST_2093 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001025',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 111,
		max_level = 121,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 935675914,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_NECKLACE', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001026',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001027',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001028',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001029',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001030',
		},
	}
}
