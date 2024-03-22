QUEST_TUTORIAL05 = {
	title = 'IDS_PROPQUEST_INC_002229',
	character = 'MaFl_Losha',
	end_character = 'MaFl_Luda',
	start_requirements = {
		min_level = 1,
		max_level = 5,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_TUTORIAL04',
	},
	rewards = {
		gold = 1500,
		exp = 20,
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_AIBATT1', quantity = 15 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002230',
			'IDS_PROPQUEST_INC_002231',
			'IDS_PROPQUEST_INC_002232',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002233',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002234',
		},
		completed = {
			'IDS_PROPQUEST_INC_002235',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002236',
		},
	}
}
