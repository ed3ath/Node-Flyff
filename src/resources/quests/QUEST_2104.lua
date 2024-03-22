QUEST_2104 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001152',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 105,
		max_level = 129,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1672126053,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_CURSEBIGTOENAIL', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001153',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001154',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001155',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001156',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001157',
		},
	}
}
